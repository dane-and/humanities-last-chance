
import { Article } from '../../types/article';
import { getArticlesFromStorage, saveArticlesToStorage } from './articleStorage';

/**
 * Export articles data as JSON file
 */
export const exportArticlesData = (): void => {
  try {
    const articles = getArticlesFromStorage();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(articles, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `humanities-last-chance-articles-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
    const articles = JSON.parse(jsonData) as Article[];
    if (!Array.isArray(articles)) {
      throw new Error('Invalid data format');
    }
    
    // Import via API if possible
    try {
      const API_BASE_URL = '/api';
      
      // Create FormData for file upload
      const formData = new FormData();
      const blob = new Blob([jsonData], { type: 'application/json' });
      formData.append('dataFile', blob, 'articles-import.json');
      
      const response = await fetch(`${API_BASE_URL}/import.php`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API import failed:', errorData.error);
        throw new Error(errorData.error);
      }
      
      return true;
    } catch (apiError) {
      console.error('Error importing via API:', apiError);
      
      // Fallback to localStorage
      console.log('Falling back to localStorage import');
      saveArticlesToStorage(articles);
      return true;
    }
  } catch (e) {
    console.error('Error importing articles data:', e);
    return false;
  }
};
