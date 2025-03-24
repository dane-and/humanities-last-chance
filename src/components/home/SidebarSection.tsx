// SidebarSection.tsx

import React, { useState, useEffect } from 'react';
import { findCourse } from '@/components/resources/humanities/utils';
import InterviewsSection from './sidebar/InterviewsSection';
import ReviewsSection from './sidebar/ReviewsSection';
import HumanitiesPreview from './sidebar/HumanitiesPreview';
import { Article } from '@/lib/types/article';
import { fetchArticlesByCategory } from '@/lib/sanity';

const featuredCourseTitles = [
  "Shakespeare After All: The Later Plays",
  "The Hebrew Bible",
  "The Human Brain",
  "Introduction to Theory of Literature",
  "World Economic History Before the Industrial Revolution"
];

const SidebarSection: React.FC = () => {
  const [interviews, setInterviews] = useState<Article[]>([]);
  const [reviews, setReviews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSidebarContent = async () => {
      setLoading(true);

      try {
        // Fetch interviews
        const sanityInterviews = await fetchArticlesByCategory('interviews');
        const formattedInterviews = sanityInterviews.map((post: any) => ({
          id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: post.title || "Untitled Post",
          slug: post.slug?.current || `post-${Date.now()}`,
          date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : new Date().toLocaleDateString(),
          category: post.category ?? '',
          image: post.mainImage?.asset?.url || '',
          excerpt: post.excerpt || '',
          content: post.body || '',
          featured: false,
          tags: post.tags || [],
          publishedAt: post.publishedAt || post._createdAt || new Date().toISOString(),
        }));

        const sortedInterviews = formattedInterviews.sort((a, b) =>
          new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime()
        );

        // ✅ Fix: fetch reviews using lowercase key
        const sanityReviews = await fetchArticlesByCategory('reviews');
        const formattedReviews = sanityReviews.map((post: any) => ({
          id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: post.title || "Untitled Post",
          slug: post.slug?.current || `post-${Date.now()}`,
          date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : new Date().toLocaleDateString(),
          category: post.category ?? '',
          image: post.mainImage?.asset?.url || '',
          excerpt: post.excerpt || '',
          content: post.body || '',
          featured: false,
          tags: post.tags || [],
          publishedAt: post.publishedAt || post._createdAt || new Date().toISOString(),
        }));

        const sortedReviews = formattedReviews.sort((a, b) =>
          new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime()
        );

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
