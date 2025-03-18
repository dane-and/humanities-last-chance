
import React from 'react';
import { Comment } from '@/lib/types/article';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface CommentItemProps {
  comment: Comment;
  onVote?: (commentId: string, voteType: 'like' | 'dislike') => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onVote }) => {
  // Format the date as a relative time (e.g., "2 days ago")
  const formattedDate = comment.date ? 
    formatDistanceToNow(new Date(comment.date), { addSuffix: true }) : 
    'just now';

  return (
    <div className="py-4 border-b border-border last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{comment.name}</h3>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
        {onVote && (
          <div className="flex items-center space-x-2">
            <button 
              className="flex items-center text-sm transition-colors hover:text-primary"
              onClick={() => onVote(comment.id, 'like')}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{comment.likes}</span>
            </button>
            <button 
              className="flex items-center text-sm transition-colors hover:text-destructive"
              onClick={() => onVote(comment.id, 'dislike')}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>{comment.dislikes}</span>
            </button>
          </div>
        )}
      </div>
      <p className="text-sm leading-relaxed whitespace-pre-line">{comment.content}</p>
    </div>
  );
};

export default CommentItem;
