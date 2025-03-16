
import { 
  saveArticlesToStorage, 
  saveDraftsToStorage,
  saveScheduledToStorage 
} from './articleStorage';

/**
 * Import articles data from JSON file
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
