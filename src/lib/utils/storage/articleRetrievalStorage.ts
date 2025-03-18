
import { Article, defaultArticles } from '../../types/article';
import { STORAGE_KEY, DRAFTS_KEY, SCHEDULED_KEY, getFromLocalStorage } from './articleStorageBase';

/**
 * Gets articles from local storage (fallback method)
 */
export const getArticlesFromStorage = (): Article[] => {
  const articles = getFromLocalStorage<Article[]>(STORAGE_KEY, defaultArticles);
  console.log(`Retrieved ${articles.length} articles from storage`);
  return articles;
};

/**
 * Gets draft articles from local storage
 */
export const getDraftsFromStorage = (): Article[] => {
  const drafts = getFromLocalStorage<Article[]>(DRAFTS_KEY, []);
  console.log(`Retrieved ${drafts.length} drafts from storage`);
  return drafts;
};

/**
 * Gets scheduled articles from local storage
 */
export const getScheduledFromStorage = (): Article[] => {
  return getFromLocalStorage<Article[]>(SCHEDULED_KEY, []);
};

/**
 * Gets article by title (case insensitive)
 */
export const getArticleByTitle = (title: string, articleList: Article[] = []): Article | undefined => {
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  return articles.find(article => 
    article.title.toLowerCase() === title.toLowerCase()
  );
};

/**
 * Gets draft by title (case insensitive)
 */
export const getDraftByTitle = (title: string): Article | undefined => {
  const drafts = getDraftsFromStorage();
  return drafts.find(draft => 
    draft.title.toLowerCase() === title.toLowerCase()
  );
};
