
import React, { useState, useEffect } from 'react';
import { findCourse } from '@/components/resources/humanities/utils';
import InterviewsSection from './sidebar/InterviewsSection';
import ReviewsSection from './sidebar/ReviewsSection';
import HumanitiesPreview from './sidebar/HumanitiesPreview';
import { Article } from '@/lib/types/article';
import { fetchArticlesByCategory } from '@/lib/sanity';
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
        
        // Fetch interviews - using lowercase to match Sanity schema
        console.log("Fetching interview articles for sidebar...");
        const sanityInterviews = await fetchArticlesByCategory('interview');
        console.log(`Found ${sanityInterviews?.length || 0} interviews from Sanity`);
        
        // Fetch reviews - Try both 'review' and 'reviews' to maximize matches
        console.log("Fetching review articles for sidebar...");
        const sanityReviews = await fetchArticlesByCategory('review');
        console.log(`Found ${sanityReviews?.length || 0} reviews from Sanity`);
        
        // Convert to proper Article types with normalized categories
        const typedInterviews = sanityInterviews.map(mapSanityPostToArticle);
        const typedReviews = sanityReviews.map(mapSanityPostToArticle);
        
        // Take only 2 most recent for each category
        setInterviews(typedInterviews.slice(0, 2));
        setReviews(typedReviews.slice(0, 2));
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
