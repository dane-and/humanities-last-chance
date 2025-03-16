
import { Article, defaultArticles } from '../../types/article';

const STORAGE_KEY = 'hlc-articles';
const DRAFTS_KEY = 'hlc-drafts';
const SCHEDULED_KEY = 'hlc-scheduled';
const LAST_BACKUP_KEY = 'hlc-last-backup-date';
const BACKUP_REMINDER_DAYS = 7; // Remind user to backup every 7 days

/**
 * Gets articles from local storage (fallback method)
 */
export const getArticlesFromStorage = (): Article[] => {
  try {
    // Check if we're in a browser environment (for SSR compatibility)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedArticles = localStorage.getItem(STORAGE_KEY);
      
      // If no articles in storage, save default articles first
      if (!savedArticles) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultArticles));
        return defaultArticles;
      }
      
      return JSON.parse(savedArticles);
    }
    return defaultArticles;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultArticles;
  }
};

/**
 * Gets draft articles from local storage
 */
export const getDraftsFromStorage = (): Article[] => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedDrafts = localStorage.getItem(DRAFTS_KEY);
      return savedDrafts ? JSON.parse(savedDrafts) : [];
    }
    return [];
  } catch (e) {
    console.error('Error reading drafts from localStorage:', e);
    return [];
  }
};

/**
 * Gets scheduled articles from local storage
 */
export const getScheduledFromStorage = (): Article[] => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedScheduled = localStorage.getItem(SCHEDULED_KEY);
      return savedScheduled ? JSON.parse(savedScheduled) : [];
    }
    return [];
  } catch (e) {
    console.error('Error reading scheduled articles from localStorage:', e);
    return [];
  }
};

/**
 * Saves articles to local storage AND to the server
 */
export const saveArticlesToStorage = async (articles: Article[]): Promise<void> => {
  try {
    // Check if we're in a browser environment (for SSR compatibility)
    if (typeof window !== 'undefined' && window.localStorage) {
      // Save to localStorage as a fallback
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
      
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
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    }
  } catch (e) {
    console.error('Error saving drafts to localStorage:', e);
  }
};

/**
 * Saves scheduled articles to local storage
 */
export const saveScheduledToStorage = (scheduled: Article[]): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(SCHEDULED_KEY, JSON.stringify(scheduled));
    }
  } catch (e) {
    console.error('Error saving scheduled articles to localStorage:', e);
  }
};

/**
 * Records when a backup was performed
 */
export const recordBackupPerformed = () => {
  localStorage.setItem(LAST_BACKUP_KEY, new Date().toISOString());
};

/**
 * Checks if it's time to remind the user to create a backup
 */
export const checkBackupReminder = (): boolean => {
  const lastBackup = localStorage.getItem(LAST_BACKUP_KEY);
  
  if (!lastBackup) {
    return true; // No backup ever recorded
  }
  
  const lastBackupDate = new Date(lastBackup);
  const currentDate = new Date();
  
  // Calculate days since last backup
  const daysSinceBackup = Math.floor(
    (currentDate.getTime() - lastBackupDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  return daysSinceBackup >= BACKUP_REMINDER_DAYS;
};

/**
 * Gets days since the last backup was performed
 */
export const getDaysSinceLastBackup = (): number | null => {
  const lastBackup = localStorage.getItem(LAST_BACKUP_KEY);
  
  if (!lastBackup) {
    return null; // No backup ever recorded
  }
  
  const lastBackupDate = new Date(lastBackup);
  const currentDate = new Date();
  
  // Calculate days since last backup
  return Math.floor(
    (currentDate.getTime() - lastBackupDate.getTime()) / (1000 * 60 * 60 * 24)
  );
};

/**
 * Function to publish a scheduled article if its publish date has arrived
 */
export const processScheduledArticles = (): void => {
  try {
    const scheduled = getScheduledFromStorage();
    const articles = getArticlesFromStorage();
    const now = new Date();
    
    // Find scheduled articles that should be published
    const toPublish = scheduled.filter(article => {
      if (!article.scheduledDate) return false;
      const publishDate = new Date(article.scheduledDate);
      return publishDate <= now;
    });
    
    if (toPublish.length > 0) {
      // Remove scheduledDate field before publishing
      const publishReady = toPublish.map(article => {
        const { scheduledDate, ...rest } = article;
        return rest;
      });
      
      // Add to published articles
      const updatedArticles = [...articles, ...publishReady];
      
      // Remove published articles from scheduled list
      const remainingScheduled = scheduled.filter(article => {
        if (!article.scheduledDate) return true;
        const publishDate = new Date(article.scheduledDate);
        return publishDate > now;
      });
      
      // Save changes
      saveArticlesToStorage(updatedArticles);
      saveScheduledToStorage(remainingScheduled);
    }
  } catch (e) {
    console.error('Error processing scheduled articles:', e);
  }
};

