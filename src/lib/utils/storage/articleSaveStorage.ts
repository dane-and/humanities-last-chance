
import { Article } from '../../types/article';
import { STORAGE_KEY, DRAFTS_KEY, SCHEDULED_KEY, saveToLocalStorage, LAST_BACKUP_KEY } from './articleStorageBase';
import { checkBackupReminder } from './backupStorage';

/**
 * Saves articles to local storage AND to the server
 */
export const saveArticlesToStorage = async (articles: Article[]): Promise<void> => {
  try {
    // Check if we're in a browser environment (for SSR compatibility)
    if (typeof window !== 'undefined' && window.localStorage) {
      // Save to localStorage as a fallback
      saveToLocalStorage(STORAGE_KEY, articles);
      
      // Create a download data file to allow manual backup
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(articles, null, 2));
      
      // Create and dispatch a custom event that the admin can listen for
      const event = new CustomEvent('articlesSaved', { 
        detail: { 
          timestamp: new Date().toISOString(),
          articleCount: articles.length,
          dataUrl: dataStr
        } 
      });
      window.dispatchEvent(event);
      
      // Check if reminder should be shown
      checkBackupReminder();
      
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
  saveToLocalStorage(DRAFTS_KEY, drafts);
};

/**
 * Saves scheduled articles to local storage
 */
export const saveScheduledToStorage = (scheduled: Article[]): void => {
  saveToLocalStorage(SCHEDULED_KEY, scheduled);
};
