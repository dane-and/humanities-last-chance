
import { Article, defaultArticles } from '../../types/article';
import { STORAGE_KEY, DRAFTS_KEY, SCHEDULED_KEY, getFromLocalStorage } from './articleStorageBase';

/**
 * Gets articles from local storage (fallback method)
 */
export const getArticlesFromStorage = (): Article[] => {
  return getFromLocalStorage<Article[]>(STORAGE_KEY, defaultArticles);
};

/**
 * Gets draft articles from local storage
 */
export const getDraftsFromStorage = (): Article[] => {
  return getFromLocalStorage<Article[]>(DRAFTS_KEY, []);
};

/**
 * Gets scheduled articles from local storage
 */
export const getScheduledFromStorage = (): Article[] => {
  return getFromLocalStorage<Article[]>(SCHEDULED_KEY, []);
};
