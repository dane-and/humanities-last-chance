
import React from 'react';
import { Comment } from '@/lib/types/article';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  onVote: (commentId: string, voteType: 'like' | 'dislike') => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onVote }) => {
  if (!comments || comments.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No comments yet. Be the first to share your thoughts!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          onVote={onVote} 
        />
      ))}
    </div>
  );
};

export default CommentList;
