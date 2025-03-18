
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
  
  // Log the incoming category search parameter
  console.log(`Searching for articles with category "${category}"`);
  
  // For URL matching purposes only, use case-insensitive comparison 
  // but preserve the original category case in the returned articles
  const normalizedCategory = category.toLowerCase();
  
  // Filter by category (case-insensitive match for filtering only)
  const filtered = articles.filter(article => {
    // Log what we're comparing
    console.log(`Comparing search category "${normalizedCategory}" with article category "${article.category.toLowerCase()}"`);
    return article.category.toLowerCase() === normalizedCategory;
  })
  // Sort by date (newest first)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Log the results
  console.log(`Found ${filtered.length} articles for category "${category}"`);
  filtered.forEach(article => {
    console.log(`- Article "${article.title}" has category "${article.category}"`);
  });
  
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
