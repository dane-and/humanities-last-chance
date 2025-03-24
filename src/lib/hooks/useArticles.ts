
import { useState, useEffect } from 'react';
import { Article } from '../types/article';
import { toast } from 'sonner';
import { getArticlesFromStorage, saveArticlesToStorage } from '../utils/storage/articleStorage';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadArticles = () => {
    setIsLoading(true);
    
    try {
      console.log('Loading articles from storage in useArticles hook');
      // Load articles using the common storage function
      const loadedArticles = getArticlesFromStorage();
      setArticles(loadedArticles);
      setError(null);
    } catch (err) {
      console.error('Error loading articles:', err);
      setError(err instanceof Error ? err : new Error('Unknown error loading articles'));
      
      // Use empty array on error instead of defaults
      setArticles([]);
      toast.error("Error loading articles.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
    
    // Add event listener for article updates
    const handleArticlesUpdated = () => {
      console.log('Articles updated event detected, reloading articles');
      loadArticles();
    };
    
    window.addEventListener('articlesUpdated', handleArticlesUpdated);
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('articlesUpdated', handleArticlesUpdated);
    };
  }, []);

  const refreshArticles = () => {
    loadArticles();
  };

  const updateArticles = (newArticles: Article[]) => {
    try {
      console.log('Updating articles in useArticles hook:', newArticles.length);
      saveArticlesToStorage(newArticles);
      setArticles(newArticles);
    } catch (err) {
      console.error('Error updating articles:', err);
      toast.error("Failed to update articles");
    }
  };

  return { articles, isLoading, error, refreshArticles, updateArticles };
};
