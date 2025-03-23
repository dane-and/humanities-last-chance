
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import ReviewsDebugInfo from '@/components/article/ReviewsDebugInfo';
import ReviewsLoading from '@/components/article/ReviewsLoading';
import ReviewsEmptyState from '@/components/article/ReviewsEmptyState';
import { useReviewsData } from '@/hooks/useReviewsData';

const ArticlesReviews: React.FC = () => {
  const { articles, allPosts, loading, error } = useReviewsData();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold mb-8">Reviews</h1>
          
          {loading ? (
            <ReviewsLoading />
          ) : (
            <div>
              {/* Debug information component - only shown in development */}
              <ReviewsDebugInfo 
                allPosts={allPosts} 
                articles={articles} 
                error={error} 
              />
              
              {articles.length === 0 ? (
                <ReviewsEmptyState error={error} />
              ) : (
                <ArticleGrid articles={articles} columns={3} />
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlesReviews;
