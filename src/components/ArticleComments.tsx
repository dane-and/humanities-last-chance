
import React from 'react';
import { toast } from 'sonner';
import { Comment } from '@/lib/types/article';
import { CommentForm, CommentList } from '@/components/comment';

interface ArticleCommentsProps {
  articleId: string;
  comments: Comment[];
  onCommentAdded: () => void;
}

const ArticleComments: React.FC<ArticleCommentsProps> = ({ 
  articleId, 
  comments,
  onCommentAdded
}) => {
  const handleVote = (commentId: string, voteType: 'like' | 'dislike') => {
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
      
      onCommentAdded(); // Refresh comments
    } catch (error) {
      console.error('Error updating vote:', error);
      toast.error("Failed to update vote. Please try again later.");
    }
  };

  return (
    <div className="mt-16 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      
      <CommentForm 
        articleId={articleId} 
        onCommentSubmitted={onCommentAdded} 
      />
      
      <CommentList 
        comments={comments} 
        onVote={handleVote} 
      />
    </div>
  );
};

export default ArticleComments;
