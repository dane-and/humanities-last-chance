
import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types/article';
import { getArticlesByCategory } from '@/lib/queries/articleQueries';
import { getArticlesFromStorage } from '@/lib/utils/storage/articleStorage';
import { toast } from 'sonner';

// Empty pre-baked articles - removing all pre-configured content
const preBakedArticles: Article[] = [];

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBlogPosts = useCallback(() => {
    console.log("Fetching blog posts...");
    setIsLoading(true);
    setError(null);
    
    try {
      // Empty blog posts everywhere
      setBlogPosts([]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error fetching blog posts';
      console.error('Error fetching blog posts:', errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));
      
      // Return empty array on error as well
      setBlogPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchBlogPosts();
    
    // Add event listener for article updates with a specific name for debugging
    const handleArticlesUpdatedEvent = () => {
      console.log('articlesUpdated event detected in useBlogPosts, refreshing posts');
      fetchBlogPosts();
    };
    
    window.addEventListener('articlesUpdated', handleArticlesUpdatedEvent);
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('articlesUpdated', handleArticlesUpdatedEvent);
    };
  }, [fetchBlogPosts]);
  
  return { blogPosts, isLoading, error, fetchBlogPosts };
};
