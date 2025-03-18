
import { toast } from 'sonner';
import { Comment } from '@/lib/types/article';

/**
 * Updates the vote count for a comment in localStorage
 */
export const handleCommentVote = (
  articleId: string,
  commentId: string,
  voteType: 'like' | 'dislike',
  onCommentAdded: () => void
): void => {
  try {
    // Update vote using localStorage
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
    
    toast.success(`You ${voteType}d this comment`);
    
    // Refresh comments
    onCommentAdded(); 
  } catch (error) {
    console.error('Error updating vote:', error);
    toast.error("Failed to update vote. Please try again later.");
  }
};
