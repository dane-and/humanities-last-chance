
import { useState, useEffect } from 'react';
import { Article, defaultArticles } from '../types/article';
import { fetchArticlesFromApi, fetchArticlesFromSheet } from '../api/articleApi';
import { getArticlesFromStorage, saveArticlesToStorage } from '../utils/storageUtils';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        
        // Primary source: Server API
        try {
          const apiArticles = await fetchArticlesFromApi();
          if (apiArticles && apiArticles.length > 0) {
            setArticles(apiArticles);
            setError(null);
            setIsLoading(false);
            return;
          }
        } catch (apiError) {
          console.warn('Could not retrieve from API, trying fallbacks:', apiError);
        }
        
        // Secondary source: Local storage
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
        
        // Tertiary source: Google Sheets
        try {
          const sheetData = await fetchArticlesFromSheet();
          if (sheetData && sheetData.length > 0) {
            // Initialize comments arrays if needed
            const articlesWithComments = sheetData.map(article => ({
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
            console.warn('Received empty data from all sources, using defaults');
          }
        } catch (fetchErr) {
          console.error('Failed to fetch from all sources, using defaults:', fetchErr);
          setArticles(defaultArticles);
          setError(new Error('Failed to fetch articles from any source. Using default content.'));
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
