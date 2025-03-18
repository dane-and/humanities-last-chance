
import { Article } from '../../types/article';
import { STORAGE_KEY, DRAFTS_KEY, SCHEDULED_KEY, saveToLocalStorage, LAST_BACKUP_KEY } from './articleStorageBase';
import { checkBackupReminder } from './backupStorage';

/**
 * Sorts articles by date (newest first)
 */
const sortArticlesByDate = (articles: Article[]): Article[] => {
  return [...articles].sort((a, b) => {
    // Handle null/undefined dates
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
};

/**
 * Saves articles to local storage AND to the server
 */
export const saveArticlesToStorage = async (articles: Article[]): Promise<void> => {
  try {
    // Check if we're in a browser environment (for SSR compatibility)
    if (typeof window !== 'undefined' && window.localStorage) {
      console.log('Saving articles to local storage:', articles.length);
      
      // Sort articles before saving (newest first)
      const sortedArticles = sortArticlesByDate(articles);
      
      // Save to localStorage 
      saveToLocalStorage(STORAGE_KEY, sortedArticles);
      
      // Create a download data file to allow manual backup
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sortedArticles, null, 2));
      
      // Create and dispatch a custom event that the admin can listen for
      const event = new CustomEvent('articlesSaved', { 
        detail: { 
          timestamp: new Date().toISOString(),
          articleCount: sortedArticles.length,
          dataUrl: dataStr
        } 
      });
      window.dispatchEvent(event);
      
      // Check if reminder should be shown
      checkBackupReminder();
      
      // Force reload of article data in relevant components
      const reloadEvent = new CustomEvent('articlesUpdated');
      window.dispatchEvent(reloadEvent);
      
      // Note: Server-side saving happens elsewhere now through API calls
    }
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};

/**
 * Saves draft articles to local storage
 */
export const saveDraftsToStorage = (drafts: Article[]): void => {
  console.log('Saving drafts to storage:', drafts.length);
  // Sort drafts by lastModified date (newest first)
  const sortedDrafts = [...drafts].sort((a, b) => {
    const dateA = a.lastModified ? new Date(a.lastModified) : new Date(a.date);
    const dateB = b.lastModified ? new Date(b.lastModified) : new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  saveToLocalStorage(DRAFTS_KEY, sortedDrafts);
};

/**
 * Saves scheduled articles to local storage
 */
export const saveScheduledToStorage = (scheduled: Article[]): void => {
  console.log('Saving scheduled articles to storage:', scheduled.length);
  // Sort by scheduled date (soonest first)
  const sortedScheduled = [...scheduled].sort((a, b) => {
    const dateA = a.scheduledDate ? new Date(a.scheduledDate) : new Date(0);
    const dateB = b.scheduledDate ? new Date(b.scheduledDate) : new Date(0);
    return dateA.getTime() - dateB.getTime();
  });
  saveToLocalStorage(SCHEDULED_KEY, sortedScheduled);
};
