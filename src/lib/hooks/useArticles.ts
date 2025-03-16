
import { useState, useEffect } from 'react';
import { Article, defaultArticles } from '../types/article';
import { toast } from 'sonner';
import { getArticlesFromStorage, saveArticlesToStorage } from '../utils/storage/articleStorage';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadArticles = () => {
      setIsLoading(true);
      
      try {
        // Load articles using the common storage function
        const loadedArticles = getArticlesFromStorage();
        setArticles(loadedArticles);
        setError(null);
      } catch (err) {
        console.error('Error loading articles:', err);
        setError(err instanceof Error ? err : new Error('Unknown error loading articles'));
        
        // Use defaults on error
        setArticles(defaultArticles);
        toast.error("Error loading articles. Using default content.");
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  const refreshArticles = () => {
    setIsLoading(true);
    
    try {
      const loadedArticles = getArticlesFromStorage();
      setArticles(loadedArticles);
      setError(null);
    } catch (err) {
      console.error('Error refreshing articles:', err);
      setError(err instanceof Error ? err : new Error('Unknown error refreshing articles'));
    } finally {
      setIsLoading(false);
    }
  };

  const updateArticles = (newArticles: Article[]) => {
    try {
      saveArticlesToStorage(newArticles);
      setArticles(newArticles);
    } catch (err) {
      console.error('Error updating articles:', err);
      toast.error("Failed to update articles");
    }
  };

  return { articles, isLoading, error, refreshArticles, updateArticles };
};
