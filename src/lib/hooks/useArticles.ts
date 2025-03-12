
import { useState, useEffect } from 'react';
import { Article, defaultArticles } from '../types/article';
import { fetchArticlesFromSheet } from '../api/articleApi';
import { getArticlesFromStorage, saveArticlesToStorage } from '../utils/storageUtils';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        
        // Try to get articles from localStorage first
        try {
          const localArticles = getArticlesFromStorage();
          if (localArticles && localArticles.length > defaultArticles.length) {
            setArticles(localArticles);
            setError(null);
            setIsLoading(false);
            return;
          }
        } catch (localErr) {
          console.warn('Could not retrieve from localStorage:', localErr);
        }
        
        // Try to fetch from external source
        try {
          const data = await fetchArticlesFromSheet();
          if (data && data.length > 0) {
            // Initialize comments arrays if needed
            const articlesWithComments = data.map(article => ({
              ...article,
              comments: article.comments || []
            }));
            
            setArticles(articlesWithComments);
            // Save to localStorage for future use
            saveArticlesToStorage(articlesWithComments);
            setError(null);
          } else {
            // If we received empty data, use defaults
            setArticles(defaultArticles);
            console.warn('Received empty data from external source, using defaults');
          }
        } catch (fetchErr) {
          console.error('Failed to fetch from external source, using defaults:', fetchErr);
          setArticles(defaultArticles);
          setError(new Error('Failed to fetch articles from external source. Using default content.'));
        }
      } catch (err) {
        console.error('Error loading articles:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        // Ensure we at least have the default articles
        setArticles(defaultArticles);
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, []);

  return { articles, isLoading, error };
};
