
import React, { useState, useEffect } from 'react';
import { findCourse } from '@/components/resources/humanities/utils';
import InterviewsSection from './sidebar/InterviewsSection';
import ReviewsSection from './sidebar/ReviewsSection';
import HumanitiesPreview from './sidebar/HumanitiesPreview';
import { Article } from '@/lib/types/article';
import { fetchArticlesByCategory } from '@/lib/sanity';
import { toast } from 'sonner';

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
        // Fetch interviews - using lowercase to match Sanity schema
        console.log("Fetching interview articles for sidebar...");
        const sanityInterviews = await fetchArticlesByCategory('interview');
        console.log(`Found ${sanityInterviews?.length || 0} interviews from Sanity`);
        
        // Fetch reviews - Try both 'review' and 'reviews' to maximize matches
        console.log("Fetching review articles for sidebar...");
        const sanityReviews = await fetchArticlesByCategory('review');
        console.log(`Found ${sanityReviews?.length || 0} reviews from Sanity`);
        
        // Take only 2 most recent for each category
        // Note: fetchArticlesByCategory now returns properly typed Article[] objects
        setInterviews(sanityInterviews.slice(0, 2));
        setReviews(sanityReviews.slice(0, 2));
      } catch (error) {
        console.error("Error fetching sidebar content:", error);
        toast.error("Failed to load sidebar content");
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
