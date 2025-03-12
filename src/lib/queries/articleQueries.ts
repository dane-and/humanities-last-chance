
import { Article } from '../types/article';
import { getArticlesFromStorage } from '../utils/storageUtils';

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
  const filtered = articles.filter(
    article => article.category.toLowerCase() === category.toLowerCase()
  );
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
 * Gets articles by tag
 */
export const getArticlesByTag = (tag: string, count?: number, articleList: Article[] = []): Article[] => {
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  const filtered = articles.filter(
    article => article.tags && article.tags.includes(tag)
  );
  return count ? filtered.slice(0, count) : filtered;
};
