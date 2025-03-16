
import { useState, useEffect } from 'react';
import { Article, defaultArticles } from '../types/article';
import { toast } from 'sonner';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadArticles = () => {
      setIsLoading(true);
      
      try {
        // Load from localStorage
        const savedArticles = localStorage.getItem('hlc-articles');
        if (savedArticles) {
          const parsedArticles = JSON.parse(savedArticles);
          setArticles(parsedArticles);
        } else {
          // If no articles in storage, use defaults
          setArticles(defaultArticles);
          localStorage.setItem('hlc-articles', JSON.stringify(defaultArticles));
        }
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
      const savedArticles = localStorage.getItem('hlc-articles');
      if (savedArticles) {
        const parsedArticles = JSON.parse(savedArticles);
        setArticles(parsedArticles);
      }
      setError(null);
    } catch (err) {
      console.error('Error refreshing articles:', err);
      setError(err instanceof Error ? err : new Error('Unknown error refreshing articles'));
    } finally {
      setIsLoading(false);
    }
  };

  return { articles, isLoading, error, refreshArticles };
};
