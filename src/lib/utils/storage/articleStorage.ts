
import { Article, defaultArticles } from '../../types/article';

const STORAGE_KEY = 'hlc-articles';

/**
 * Gets articles from local storage (fallback method)
 */
export const getArticlesFromStorage = (): Article[] => {
  try {
    // Check if we're in a browser environment (for SSR compatibility)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedArticles = localStorage.getItem(STORAGE_KEY);
      
      // If no articles in storage, save default articles first
      if (!savedArticles) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultArticles));
        return defaultArticles;
      }
      
      return JSON.parse(savedArticles);
    }
    return defaultArticles;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultArticles;
  }
};

/**
 * Saves articles to local storage AND to the server
 */
export const saveArticlesToStorage = async (articles: Article[]): Promise<void> => {
  try {
    // Check if we're in a browser environment (for SSR compatibility)
    if (typeof window !== 'undefined' && window.localStorage) {
      // Save to localStorage as a fallback
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
      
      // Create a download data file to allow manual backup
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(articles, null, 2));
      
      // Create and dispatch a custom event that the admin can listen for
      const event = new CustomEvent('articlesSaved', { 
        detail: { 
          timestamp: new Date().toISOString(),
          articleCount: articles.length,
          dataUrl: dataStr
        } 
      });
      window.dispatchEvent(event);
      
      // Note: Server-side saving happens elsewhere now through API calls
    }
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};
