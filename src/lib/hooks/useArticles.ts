
import { useState, useEffect } from 'react';
import { Article, defaultArticles } from '../types/article';
import { fetchArticles } from '../api/articleApi';
import { getArticlesFromStorage, saveArticlesToStorage } from '../utils/storageUtils';
import { API_CONFIG } from '../config';
import { useToast } from '@/hooks/use-toast';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getArticlesData = async () => {
      setIsLoading(true);
      
      try {
        // First check if we have cached articles to show immediately
        if (API_CONFIG.FEATURES.USE_LOCAL_STORAGE_FALLBACK) {
          const cachedArticles = getArticlesFromStorage();
          if (cachedArticles && cachedArticles.length > 0) {
            setArticles(cachedArticles);
            // Don't set isLoading to false yet - we'll still try to fetch fresh data
          }
        }
        
        // Fetch fresh articles from all sources in parallel
        const freshArticles = await fetchArticles();
        
        if (freshArticles && freshArticles.length > 0) {
          setArticles(freshArticles);
          
          // Cache the fresh articles if they're different from what we had
          if (JSON.stringify(freshArticles) !== JSON.stringify(articles)) {
            saveArticlesToStorage(freshArticles);
          }
          
          setError(null);
        } else if (articles.length === 0) {
          // Only use defaults if we didn't find any articles from cache or API
          setArticles(defaultArticles);
          
          // Show a toast notification for fallback content
          toast({
            title: "Using default content",
            description: "Could not load latest articles. Showing placeholder content.",
            variant: "destructive"
          });
        }
      } catch (err) {
        console.error('Error in useArticles hook:', err);
        setError(err instanceof Error ? err : new Error('Unknown error loading articles'));
        
        // Only use defaults if we have no articles yet
        if (articles.length === 0) {
          setArticles(defaultArticles);
          
          toast({
            title: "Connection Error",
            description: "Could not connect to the server. Showing placeholder content.",
            variant: "destructive"
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    getArticlesData();
    
    // Set up periodic refresh if needed (every 5 minutes)
    // Uncomment this if you want auto-refresh
    /*
    const refreshInterval = setInterval(() => {
      getArticlesData();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
    */
  }, [toast]);

  return { articles, isLoading, error };
};
