
import { Comment } from '../../types/article';
import { fetchWithTimeout, getApiUrl } from '../apiUtils';

/**
 * Adds a comment to an article
 */
export const addComment = async (
  articleId: string, 
  name: string, 
  content: string
): Promise<Comment> => {
  try {
    const response = await fetchWithTimeout(
      getApiUrl('comments.php'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId,
          name,
          content
        }),
      }
    );
    
    const data = await response.json();
    return data.comment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

/**
 * Removes a comment
 */
export const removeComment = async (commentId: string): Promise<void> => {
  try {
    await fetchWithTimeout(
      getApiUrl(`comments.php/${commentId}`),
      {
        method: 'DELETE',
      }
    );
  } catch (error) {
    console.error('Error removing comment:', error);
    throw error;
  }
};
