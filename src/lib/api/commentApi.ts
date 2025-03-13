
import { Comment } from '../types/article';
import { API_CONFIG } from '../config';

/**
 * Adds a comment to an article
 */
export const addComment = async (
  articleId: string, 
  name: string, 
  content: string
): Promise<Comment> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/comments.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        articleId,
        name,
        content
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add comment');
    }
    
    const data = await response.json();
    return data.comment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

/**
 * Updates a comment's vote count
 */
export const updateCommentVote = async (
  commentId: string, 
  voteType: 'like' | 'dislike'
): Promise<{likes: number, dislikes: number}> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/comments.php/${commentId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ voteType }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update vote');
    }
    
    const data = await response.json();
    return {
      likes: data.comment.likes,
      dislikes: data.comment.dislikes
    };
  } catch (error) {
    console.error('Error updating vote:', error);
    throw error;
  }
};

/**
 * Removes a comment
 */
export const removeComment = async (commentId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/comments.php/${commentId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to remove comment');
    }
  } catch (error) {
    console.error('Error removing comment:', error);
    throw error;
  }
};
