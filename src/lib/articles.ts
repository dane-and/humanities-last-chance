
// Re-export everything from the refactored files
export type { Article } from './types/article';
export { defaultArticles } from './types/article';
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
import { defaultArticles } from './types/article';
export const articles = defaultArticles;
