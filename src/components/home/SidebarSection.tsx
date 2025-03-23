
import React, { useState, useEffect } from 'react';
import { findCourse } from '@/components/resources/humanities/utils';
import InterviewsSection from './sidebar/InterviewsSection';
import ReviewsSection from './sidebar/ReviewsSection';
import HumanitiesPreview from './sidebar/HumanitiesPreview';
import { Article } from '@/lib/types/article';
import { fetchArticlesByCategory } from '@/lib/sanity';

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
  
  // Fetch interviews and reviews from Sanity
  useEffect(() => {
    const fetchSidebarContent = async () => {
      setLoading(true);
      
      try {
        // Fetch interviews
        console.log("Fetching interview articles for sidebar...");
        const sanityInterviews = await fetchArticlesByCategory('Interview');
        console.log(`Found ${sanityInterviews.length} interviews from Sanity`);
        
        const formattedInterviews = sanityInterviews.map((post: any) => {
          const publishedDate = post.publishedAt 
            ? new Date(post.publishedAt) 
            : (post._createdAt ? new Date(post._createdAt) : new Date());
            
          return {
            id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: post.title || "Untitled Post",
            slug: post.slug?.current || `post-${Date.now()}`,
            date: publishedDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            publishedAt: post.publishedAt || post._createdAt || new Date().toISOString(),
            category: 'Interview',
            image: post.mainImage?.asset?.url || '',
            excerpt: post.excerpt || '',
            content: post.body || '',
            featured: false,
            tags: post.tags || [],
          };
        }).sort((a: any, b: any) => {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });
        
        // Fetch reviews
        console.log("Fetching review articles for sidebar...");
        const sanityReviews = await fetchArticlesByCategory('Review');
        console.log(`Found ${sanityReviews.length} reviews from Sanity`);
        
        const formattedReviews = sanityReviews.map((post: any) => {
          const publishedDate = post.publishedAt 
            ? new Date(post.publishedAt) 
            : (post._createdAt ? new Date(post._createdAt) : new Date());
            
          return {
            id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: post.title || "Untitled Post",
            slug: post.slug?.current || `post-${Date.now()}`,
            date: publishedDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            publishedAt: post.publishedAt || post._createdAt || new Date().toISOString(),
            category: 'Review',
            image: post.mainImage?.asset?.url || '',
            excerpt: post.excerpt || '',
            content: post.body || '',
            featured: false,
            tags: post.tags || [],
          };
        }).sort((a: any, b: any) => {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });
        
        console.log(`Formatted ${formattedInterviews.length} interviews and ${formattedReviews.length} reviews for sidebar`);
        
        // Take only 2 most recent for each category
        setInterviews(formattedInterviews.slice(0, 2));
        setReviews(formattedReviews.slice(0, 2));
      } catch (error) {
        console.error("Error fetching sidebar content:", error);
        setInterviews([]);
        setReviews([]);
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
      <InterviewsSection interviews={interviews} />
      <ReviewsSection reviews={reviews} />
      <HumanitiesPreview featuredCourses={featuredCourses} />
    </div>
  );
};

export default SidebarSection;
