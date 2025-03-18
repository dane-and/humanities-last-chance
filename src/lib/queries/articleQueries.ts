
import { Article } from '../types/article';
import { getArticlesFromStorage } from '../utils/storage/articleStorage';

/**
 * Gets featured articles
 */
export const getFeaturedArticles = (articleList: Article[] = []): Article[] => {
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  return articles.filter(article => article.featured);
};

/**
 * Gets latest articles, sorted by date
 */
export const getLatestArticles = (count: number = 6, articleList: Article[] = []): Article[] => {
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  return [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

/**
 * Gets articles by category
 */
export const getArticlesByCategory = (category: string, count?: number, articleList: Article[] = []): Article[] => {
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  const normalizedCategory = category.toLowerCase();
  
  // Filter by category (case-insensitive match)
  const filtered = articles.filter(
    article => article.category.toLowerCase() === normalizedCategory
  )
  // Sort by date (newest first)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return count ? filtered.slice(0, count) : filtered;
};

/**
 * Gets a specific article by slug
 */
export const getArticleBySlug = (slug: string, articleList: Article[] = []): Article | undefined => {
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  return articles.find(article => article.slug === slug);
};

/**
 * Gets articles by tag (case-insensitive)
 */
export const getArticlesByTag = (tag: string, count?: number, articleList: Article[] = []): Article[] => {
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  const normalizedTag = tag.toLowerCase();
  
  const filtered = articles.filter(article => 
    article.tags && article.tags.some(t => t.toLowerCase() === normalizedTag)
  )
  // Sort by date (newest first)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return count ? filtered.slice(0, count) : filtered;
};
