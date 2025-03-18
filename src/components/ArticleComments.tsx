
import React from 'react';
import { Comment } from '@/lib/types/article';
import { CommentForm, CommentList } from '@/components/comment';
import { handleCommentVote } from '@/utils/commentUtils';

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
    handleCommentVote(articleId, commentId, voteType, onCommentAdded);
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
