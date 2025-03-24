
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
        const sanityInterviews = await fetchArticlesByCategory('Interview');
        const formattedInterviews = sanityInterviews.map((post: any) => ({
          id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: post.title || "Untitled Post",
          slug: post.slug?.current || `post-${Date.now()}`,
          date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : new Date().toLocaleDateString(),
          category: 'Interview',
          image: post.mainImage?.asset?.url || '',
          excerpt: post.excerpt || '',
          content: post.body || '',
          featured: false,
          tags: post.tags || [],
          publishedAt: post.publishedAt || post._createdAt || new Date().toISOString(),
        }));
        
        // Explicitly sort by publishedAt date in descending order
        const sortedInterviews = formattedInterviews.sort((a, b) => {
          const dateA = new Date(a.publishedAt || '').getTime();
          const dateB = new Date(b.publishedAt || '').getTime();
          return dateB - dateA;
        });
        
        // Fetch reviews
        const sanityReviews = await fetchArticlesByCategory('Review');
        const formattedReviews = sanityReviews.map((post: any) => ({
          id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: post.title || "Untitled Post",
          slug: post.slug?.current || `post-${Date.now()}`,
          date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : new Date().toLocaleDateString(),
          category: 'Review',
          image: post.mainImage?.asset?.url || '',
          excerpt: post.excerpt || '',
          content: post.body || '',
          featured: false,
          tags: post.tags || [],
          publishedAt: post.publishedAt || post._createdAt || new Date().toISOString(),
        }));
        
        // Explicitly sort by publishedAt date in descending order
        const sortedReviews = formattedReviews.sort((a, b) => {
          const dateA = new Date(a.publishedAt || '').getTime();
          const dateB = new Date(b.publishedAt || '').getTime();
          return dateB - dateA;
        });
        
        // Take only 2 most recent for each category
        setInterviews(sortedInterviews.slice(0, 2));
        setReviews(sortedReviews.slice(0, 2));
      } catch (error) {
        console.error("Error fetching sidebar content:", error);
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
