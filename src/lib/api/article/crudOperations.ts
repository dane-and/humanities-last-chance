
import { Article } from '../../types/article';
import { fetchWithTimeout, getApiUrl } from '../apiUtils';

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
    return data.article;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

/**
 * Updates an existing article on the server
 */
export const updateArticle = async (id: string, article: Partial<Article>): Promise<Article> => {
  try {
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
    return data.article;
  } catch (error) {
    console.error('Error updating article:', error);
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
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};
