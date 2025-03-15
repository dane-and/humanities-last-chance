
import { fetchWithTimeout, getApiUrl } from '../apiUtils';

/**
 * Updates a comment's vote count
 */
export const updateCommentVote = async (
  commentId: string, 
  voteType: 'like' | 'dislike'
): Promise<{likes: number, dislikes: number}> => {
  try {
    const response = await fetchWithTimeout(
      getApiUrl(`comments.php/${commentId}/vote`),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteType }),
      }
    );
    
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
