
import React, { useState, useEffect } from 'react';
import { findCourse } from '@/components/resources/humanities/utils';
import InterviewsSection from './sidebar/InterviewsSection';
import ReviewsSection from './sidebar/ReviewsSection';
import HumanitiesPreview from './sidebar/HumanitiesPreview';
import { Article } from '@/lib/types/article';
import { sanityClient } from '@/lib/sanity/client';
import { toast } from 'sonner';
import { testSanityConnection } from '@/lib/sanity/client';
import { mapSanityPostToArticle } from '@/lib/sanity/queries/posts/utils';

// Featured courses list
const featuredCourseTitles = [
  "Shakespeare After All: The Later Plays",
  "The Hebrew Bible",
  "The Human Brain",
  "Introduction to Theory of Literature",
  "World Economic History Before the Industrial Revolution"
];

const SidebarSection: React.FC = () => {
  // State for interviews and reviews
  const [interviews, setInterviews] = useState<Article[]>([]);
  const [reviews, setReviews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  
  // Fetch interviews and reviews from Sanity
  useEffect(() => {
    const fetchSidebarContent = async () => {
      setLoading(true);
      
      try {
        // First check connection to Sanity
        const connected = await testSanityConnection();
        if (!connected) {
          setConnectionError(true);
          return;
        }
        
        // Fetch interviews with direct GROQ query - case insensitive matching
        console.log("Fetching interview articles for sidebar...");
        const interviewQuery = `*[_type == "post" && category match "(?i)interview" && defined(slug.current)] | order(publishedAt desc)[0...2]`;
        const sanityInterviews = await sanityClient.fetch(interviewQuery);
        console.log(`Found ${sanityInterviews?.length || 0} interviews from Sanity`);
        
        // Fetch reviews with direct GROQ query - case insensitive matching
        console.log("Fetching review articles for sidebar...");
        const reviewQuery = `*[_type == "post" && category match "(?i)review" && defined(slug.current)] | order(publishedAt desc)[0...2]`;
        const sanityReviews = await sanityClient.fetch(reviewQuery);
        console.log(`Found ${sanityReviews?.length || 0} reviews from Sanity`);
        
        // Convert to proper Article types with normalized categories
        const typedInterviews = sanityInterviews.map(mapSanityPostToArticle);
        const typedReviews = sanityReviews.map(mapSanityPostToArticle);
        
        // Check and log the finished articles
        console.log("Sidebar interviews:", typedInterviews.map(a => ({ 
          title: a.title, 
          slug: a.slug, 
          category: a.category 
        })));
        console.log("Sidebar reviews:", typedReviews.map(a => ({ 
          title: a.title, 
          slug: a.slug, 
          category: a.category 
        })));
        
        setInterviews(typedInterviews);
        setReviews(typedReviews);
        setConnectionError(false);
      } catch (error) {
        console.error("Error fetching sidebar content:", error);
        toast.error("Failed to load sidebar content");
        setInterviews([]);
        setReviews([]);
        setConnectionError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSidebarContent();
  }, []);
  
  // Get featured courses
  const featuredCourses = featuredCourseTitles
    .map(findCourse)
    .filter(course => course !== null);
  
  return (
    <div className="space-y-8 sticky top-4">
      {connectionError && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4 text-sm">
          <p className="font-medium">Failed to connect to Sanity CMS</p>
          <p className="text-xs mt-1">Check your network connection and Sanity project settings.</p>
        </div>
      )}
      <InterviewsSection interviews={interviews} />
      <ReviewsSection reviews={reviews} />
      <HumanitiesPreview featuredCourses={featuredCourses} />
    </div>
  );
};

export default SidebarSection;
