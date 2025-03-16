
import { 
  getArticlesFromStorage, 
  getDraftsFromStorage,
  getScheduledFromStorage,
  recordBackupPerformed
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
