
import { useState, useEffect } from 'react';
import { Article, defaultArticles } from '../types/article';
import { fetchArticlesFromSheet } from '../api/articleApi';
import { getArticlesFromStorage } from '../utils/storageUtils';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        
        const savedArticles = localStorage.getItem('admin-articles');
        if (savedArticles) {
          setArticles(JSON.parse(savedArticles));
          setError(null);
          setIsLoading(false);
          return;
        }
        
        try {
          const data = await fetchArticlesFromSheet();
          setArticles(data);
          setError(null);
        } catch (err) {
          console.error('Failed to fetch from Google Sheet, using defaults:', err);
          setArticles(defaultArticles);
          setError(new Error('Failed to fetch articles from external source.'));
        }
      } catch (err) {
        console.error('Error loading articles:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, []);

  return { articles, isLoading, error };
};
