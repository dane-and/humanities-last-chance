
import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Comment } from '@/lib/types/article';

interface CommentItemProps {
  comment: Comment;
  onVote: (commentId: string, voteType: 'like' | 'dislike') => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onVote }) => {
  return (
    <div className="bg-secondary/20 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{comment.name}</h3>
          <p className="text-sm text-muted-foreground">{comment.date}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="flex items-center text-sm hover:text-primary transition-colors"
            onClick={() => onVote(comment.id, 'like')}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{comment.likes}</span>
          </button>
          <button 
            className="flex items-center text-sm hover:text-destructive transition-colors"
            onClick={() => onVote(comment.id, 'dislike')}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            <span>{comment.dislikes}</span>
          </button>
        </div>
      </div>
      <p className="mt-2">{comment.content}</p>
    </div>
  );
};

export default CommentItem;
