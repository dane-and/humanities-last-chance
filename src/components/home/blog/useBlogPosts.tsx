import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types/article';
import { toast } from 'sonner';
import { fetchBlogPosts } from '@/lib/sanity';

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = useCallback(async () => {
    console.log("Fetching blog posts from Sanity...");
    setIsLoading(true);
    setError(null);
    
    try {
      // Placeholder for Sanity integration
      // When Sanity is connected, this will return real data
      // For now, return empty array to show placeholders
      const posts = await fetchBlogPosts();
      
      // Convert Sanity posts format to our Article type
      // This is a temporary mapping that will need adjustment based on actual Sanity schema
      const formattedPosts: Article[] = [];
      
      // Keep empty for now - when Sanity is connected, this will populate with actual data
      setBlogPosts(formattedPosts);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error fetching blog posts';
      console.error('Error fetching blog posts:', errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));
      setBlogPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  return { blogPosts, isLoading, error, fetchBlogPosts: fetchPosts };
};
