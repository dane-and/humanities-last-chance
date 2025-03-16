
import { Article } from '../../types/article';
import { fetchWithTimeout, getApiUrl } from '../apiUtils';
import { toast } from 'sonner';
import { saveArticlesToStorage } from '../../utils/storage/articleStorage';

/**
 * Creates a new article on the server
 */
export const createArticle = async (article: Omit<Article, 'id'>): Promise<Article> => {
  try {
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
    console.log('Updating article with ID:', id, article);
    const response = await fetchWithTimeout(
      getApiUrl(`articles.php/${id}`),
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      }
    );
    
    const data = await response.json();
    
    // Also update local storage for immediate access
    const allArticles = getArticlesFromStorage();
    const updatedArticles = allArticles.map(existingArticle => 
      existingArticle.id === id ? { ...existingArticle, ...article } : existingArticle
    );
    saveArticlesToStorage(updatedArticles);
    
    console.log('Article updated successfully, saved to storage');
    return data.article;
  } catch (error) {
    console.error('Error updating article:', error);
    toast.error("Failed to update article on the server. Changes saved locally.");
    
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
    await fetchWithTimeout(
      getApiUrl(`articles.php/${id}`),
      {
        method: 'DELETE',
      }
    );
    
    // Also delete from local storage
    const allArticles = getArticlesFromStorage();
    const filteredArticles = allArticles.filter(article => article.id !== id);
    saveArticlesToStorage(filteredArticles);
    
  } catch (error) {
    console.error('Error deleting article:', error);
    toast.error("Failed to delete article on the server. Article removed locally.");
    
    // Still update local storage even if the API fails
    try {
      const allArticles = getArticlesFromStorage();
      const filteredArticles = allArticles.filter(article => article.id !== id);
      saveArticlesToStorage(filteredArticles);
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
