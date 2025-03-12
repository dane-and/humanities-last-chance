
import { Article, defaultArticles } from '../types/article';

/**
 * Gets articles from local storage
 */
export const getArticlesFromStorage = (): Article[] => {
  try {
    // Check if we're in a browser environment (for SSR compatibility)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedArticles = localStorage.getItem('admin-articles');
      return savedArticles ? JSON.parse(savedArticles) : defaultArticles;
    }
    return defaultArticles;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultArticles;
  }
};

/**
 * Saves articles to local storage
 */
export const saveArticlesToStorage = (articles: Article[]): void => {
  try {
    // Check if we're in a browser environment (for SSR compatibility)
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('admin-articles', JSON.stringify(articles));
    }
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};
