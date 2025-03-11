
// Re-export everything from the refactored files
export { Article, defaultArticles } from './types/article';
export { useArticles } from './hooks/useArticles';
export { fetchArticlesFromSheet } from './api/articleApi';
export { 
  getFeaturedArticles,
  getLatestArticles,
  getArticlesByCategory,
  getArticleBySlug,
  getArticlesByTag
} from './queries/articleQueries';
export { getArticlesFromStorage } from './utils/storageUtils';

// For backward compatibility
export const articles = defaultArticles;
