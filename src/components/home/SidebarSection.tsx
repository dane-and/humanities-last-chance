
import React from 'react';
import { getArticlesByCategory } from '@/lib/articles';
import { findCourse } from '@/components/resources/humanities/utils';
import InterviewsSection from './sidebar/InterviewsSection';
import ReviewsSection from './sidebar/ReviewsSection';
import HumanitiesPreview from './sidebar/HumanitiesPreview';

// Featured courses list
const featuredCourseTitles = [
  "Shakespeare After All: The Later Plays",
  "The Hebrew Bible",
  "The Human Brain",
  "Introduction to Theory of Literature",
  "World Economic History Before the Industrial Revolution"
];

const SidebarSection: React.FC = () => {
  // Get other content - limit to 2 most recent for sidebar
  const interviews = getArticlesByCategory('interview', 2);
  const reviews = getArticlesByCategory('review', 2);
  
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
