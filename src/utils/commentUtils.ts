
import { toast } from 'sonner';
import { Comment } from '@/lib/types/article';
import { sanityClient } from '@/lib/sanity';

/**
 * Updates the vote count for a comment in Sanity
 */
export const handleCommentVote = async (
  articleId: string,
  commentId: string,
  voteType: 'like' | 'dislike',
  onCommentAdded: () => void
): Promise<void> => {
  try {
    // Get the current post with comments
    const post = await sanityClient.fetch(
      `*[_type == "post" && _id == $id][0]{
        _id,
        comments
      }`,
      { id: articleId }
    );
    
    if (!post || !post.comments) {
      throw new Error('Article or comments not found');
    }
    
    // Find the comment to update
    const commentIndex = post.comments.findIndex((c: any) => c.id === commentId);
    
    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }
    
    // Create a patch to update the specific comment's vote count
    let patch;
    if (voteType === 'like') {
      patch = sanityClient
        .patch(articleId)
        .set({
          [`comments[${commentIndex}].likes`]: (post.comments[commentIndex].likes || 0) + 1
        });
    } else {
      patch = sanityClient
        .patch(articleId)
        .set({
          [`comments[${commentIndex}].dislikes`]: (post.comments[commentIndex].dislikes || 0) + 1
        });
    }
    
    // Commit the changes
    await patch.commit();
    
    toast.success(`You ${voteType}d this comment`);
    
    // Refresh comments
    onCommentAdded();
  } catch (error) {
    console.error('Error updating vote:', error);
    toast.error("Failed to update vote. Please try again later.");
    
    // Fallback to localStorage if Sanity fails
    try {
      const savedArticles = localStorage.getItem('hlc-articles');
      if (!savedArticles) {
        throw new Error('Articles not found in storage');
      }
      
      const articles = JSON.parse(savedArticles);
      const articleIndex = articles.findIndex((article: any) => article.id === articleId);
      
      if (articleIndex === -1) {
        throw new Error('Article not found');
      }
      
      const article = articles[articleIndex];
      
      if (!article.comments) {
        throw new Error('No comments found for this article');
      }
      
      const commentIndex = article.comments.findIndex((comment: any) => comment.id === commentId);
      
      if (commentIndex === -1) {
        throw new Error('Comment not found');
      }
      
      // Update vote count
      if (voteType === 'like') {
        article.comments[commentIndex].likes += 1;
      } else {
        article.comments[commentIndex].dislikes += 1;
      }
      
      articles[articleIndex] = article;
      
      // Save updated articles
      localStorage.setItem('hlc-articles', JSON.stringify(articles));
      
      onCommentAdded();
    } catch (fallbackError) {
      console.error('Fallback error updating vote:', fallbackError);
    }
  }
};
