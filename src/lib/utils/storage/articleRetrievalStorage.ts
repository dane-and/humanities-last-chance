
import { Article, defaultArticles } from '../../types/article';
import { STORAGE_KEY, DRAFTS_KEY, SCHEDULED_KEY, getFromLocalStorage } from './articleStorageBase';

/**
 * Gets articles from local storage (fallback method)
 */
export const getArticlesFromStorage = (): Article[] => {
  const articles = getFromLocalStorage<Article[]>(STORAGE_KEY, defaultArticles);
  console.log(`Retrieved ${articles.length} articles from storage`);
  
  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return sortedArticles;
};

/**
 * Gets draft articles from local storage
 */
export const getDraftsFromStorage = (): Article[] => {
  const drafts = getFromLocalStorage<Article[]>(DRAFTS_KEY, []);
  console.log(`Retrieved ${drafts.length} drafts from storage`);
  
  // Sort drafts by lastModified or date (newest first)
  return [...drafts].sort((a, b) => {
    const dateA = a.lastModified ? new Date(a.lastModified) : new Date(a.date);
    const dateB = b.lastModified ? new Date(b.lastModified) : new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};

/**
 * Gets scheduled articles from local storage
 */
export const getScheduledFromStorage = (): Article[] => {
  const scheduled = getFromLocalStorage<Article[]>(SCHEDULED_KEY, []);
  
  // Sort by scheduledDate (soonest first)
  return [...scheduled].sort((a, b) => {
    const dateA = a.scheduledDate ? new Date(a.scheduledDate) : new Date();
    const dateB = b.scheduledDate ? new Date(b.scheduledDate) : new Date();
    return dateA.getTime() - dateB.getTime();
  });
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
