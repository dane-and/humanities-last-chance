
import { Article } from '../../types/article';
import { 
  getArticlesFromStorage, 
  saveArticlesToStorage, 
  recordBackupPerformed,
  getDraftsFromStorage,
  saveDraftsToStorage,
  getScheduledFromStorage,
  saveScheduledToStorage 
} from './articleStorage';

/**
 * Export articles data as JSON file
 */
export const exportArticlesData = (includeAll: boolean = false): void => {
  try {
    const articles = getArticlesFromStorage();
    const drafts = includeAll ? getDraftsFromStorage() : [];
    const scheduled = includeAll ? getScheduledFromStorage() : [];
    
    const exportData = {
      published: articles,
      drafts: drafts,
      scheduled: scheduled,
      exportDate: new Date().toISOString(),
      version: "2.0"
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `humanities-last-chance-articles-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    // Record that a backup was successfully performed
    recordBackupPerformed();
  } catch (e) {
    console.error('Error exporting articles data:', e);
  }
};

/**
 * Import articles data from JSON file via API
 */
export const importArticlesData = async (jsonData: string): Promise<boolean> => {
  try {
    // First, validate the JSON data
    const parsedData = JSON.parse(jsonData);
    
    // Handle both new and old format
    if (parsedData.version && parsedData.published) {
      // New format with separate published/drafts/scheduled
      if (!Array.isArray(parsedData.published)) {
        throw new Error('Invalid data format: published articles not an array');
      }
      
      // Import articles
      saveArticlesToStorage(parsedData.published);
      
      // Import drafts if present
      if (Array.isArray(parsedData.drafts)) {
        saveDraftsToStorage(parsedData.drafts);
      }
      
      // Import scheduled if present
      if (Array.isArray(parsedData.scheduled)) {
        saveScheduledToStorage(parsedData.scheduled);
      }
    } else if (Array.isArray(parsedData)) {
      // Old format - just published articles
      saveArticlesToStorage(parsedData);
    } else {
      throw new Error('Invalid data format');
    }
    
    return true;
  } catch (e) {
    console.error('Error importing articles data:', e);
    return false;
  }
};

/**
 * Schedule automatic backup to run after a specified interval
 */
export const scheduleAutomaticBackup = (intervalDays: number = 7): void => {
  // We can't actually schedule in localStorage, but we can set a reminder
  // This would be implemented with a cloud service in a full solution
  const BACKUP_SCHEDULE_KEY = 'hlc-backup-schedule';
  
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(BACKUP_SCHEDULE_KEY, JSON.stringify({
      intervalDays,
      nextBackupDate: new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000).toISOString()
    }));
  }
};

/**
 * Export articles data to cloud storage (placeholder)
 */
export const exportArticlesToCloud = async (service: 'dropbox' | 'gdrive'): Promise<boolean> => {
  try {
    // This is a placeholder function that would be implemented with the actual API
    // For now, we'll just perform a local export
    exportArticlesData(true);
    
    // And record that we did a cloud backup
    localStorage.setItem('hlc-last-cloud-backup', JSON.stringify({
      service,
      timestamp: new Date().toISOString()
    }));
    
    return true;
  } catch (e) {
    console.error(`Error exporting to ${service}:`, e);
    return false;
  }
};

