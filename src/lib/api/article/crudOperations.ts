
import { Article } from '../../types/article';
import { fetchWithTimeout, getApiUrl } from '../apiUtils';
import { toast } from 'sonner';
import { saveArticlesToStorage } from '../../utils/storage/articleStorage';

/**
 * Creates a new article on the server
 */
export const createArticle = async (article: Omit<Article, 'id'>): Promise<Article> => {
  try {
    console.log('Creating article with data:', article);
    
    const response = await fetchWithTimeout(
      getApiUrl('articles.php'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      }
    );
    
    const data = await response.json();
    console.log('Server response for create:', data);
    
    // Also update local storage for immediate access
    const allArticles = getArticlesFromStorage();
    allArticles.push(data.article);
    saveArticlesToStorage(allArticles);
    
    return data.article;
  } catch (error) {
    console.error('Error creating article:', error);
    toast.error("Failed to create article on the server. Changes saved locally.");
    throw error;
  }
};

/**
 * Updates an existing article on the server
 */
export const updateArticle = async (id: string, article: Partial<Article>): Promise<Article> => {
  try {
    console.log('Updating article with ID:', id);
    console.log('Article data to update:', article);
    
    // Ensure the endpoint URL is correctly formatted with query parameters
    const endpoint = `articles.php?id=${encodeURIComponent(id)}`;
    const apiUrl = getApiUrl(endpoint);
    console.log('Using API endpoint:', apiUrl);
    
    // Create a complete copy of the article to send to the server
    const articleToUpdate = {
      ...article,
      id // Ensure the ID is included in the payload
    };
    
    // Log the full request details
    const requestBody = JSON.stringify(articleToUpdate);
    console.log('Request payload:', requestBody);
    
    // Start the update attempt timer for better UX feedback
    const startTime = Date.now();
    
    // Perform the update request with extra debug details
    const response = await fetchWithTimeout(
      apiUrl,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache',
        },
        body: requestBody,
      },
      10000 // Increase timeout to 10 seconds for slow connections
    );
    
    // Log the response status and timing
    const requestTime = Date.now() - startTime;
    console.log(`Server responded in ${requestTime}ms with status:`, response.status);
    
    // Get the raw response text first for debugging
    const responseText = await response.text();
    console.log('Raw server response for update:', responseText);
    
    // Try to parse the response as JSON
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed server response for update:', data);
    } catch (parseError) {
      console.error('Failed to parse server response as JSON:', parseError);
      throw new Error(`Server returned invalid JSON: ${responseText}`);
    }
    
    // Check if the response contains the expected data structure
    if (!data.article && !data.success) {
      console.error('Unexpected server response format:', data);
      throw new Error('Unexpected server response format');
    }
    
    // Get the updated article from the response
    const updatedArticle = data.article || articleToUpdate;
    
    // Also update local storage for immediate access
    const allArticles = getArticlesFromStorage();
    const updatedArticles = allArticles.map(existingArticle => 
      existingArticle.id === id ? { ...existingArticle, ...article } : existingArticle
    );
    saveArticlesToStorage(updatedArticles);
    
    console.log('Article updated successfully, saved to storage');
    return updatedArticle;
  } catch (error) {
    console.error('Error updating article:', error);
    
    // Still update local storage even if the API fails
    try {
      const allArticles = getArticlesFromStorage();
      const updatedArticles = allArticles.map(existingArticle => 
        existingArticle.id === id ? { ...existingArticle, ...article } : existingArticle
      );
      saveArticlesToStorage(updatedArticles);
      console.log('Article updated in local storage despite API failure');
    } catch (storageError) {
      console.error('Failed to update local storage:', storageError);
    }
    
    throw error;
  }
};

/**
 * Deletes an article from the server
 */
export const deleteArticle = async (id: string): Promise<void> => {
  try {
    console.log('Deleting article with ID:', id);
    
    // Use consistent query parameter format
    const endpoint = `articles.php?id=${encodeURIComponent(id)}`;
    
    await fetchWithTimeout(
      getApiUrl(endpoint),
      {
        method: 'DELETE',
      }
    );
    
    console.log('Article deleted successfully from server');
    
    // Also delete from local storage
    const allArticles = getArticlesFromStorage();
    const filteredArticles = allArticles.filter(article => article.id !== id);
    saveArticlesToStorage(filteredArticles);
    
  } catch (error) {
    console.error('Error deleting article:', error);
    
    // Still update local storage even if the API fails
    try {
      const allArticles = getArticlesFromStorage();
      const filteredArticles = allArticles.filter(article => article.id !== id);
      saveArticlesToStorage(filteredArticles);
      console.log('Article deleted from local storage despite API failure');
    } catch (storageError) {
      console.error('Failed to update local storage:', storageError);
    }
    
    throw error;
  }
};

/**
 * Helper function to get articles from storage, needed here to avoid circular imports
 */
const getArticlesFromStorage = (): Article[] => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('hlc-articles');
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return [];
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return [];
  }
};
