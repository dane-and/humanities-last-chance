
import React from 'react';
import { Comment } from '@/lib/types/article';
import CommentItem from './CommentItem';
import { Separator } from '@/components/ui/separator';

interface CommentListProps {
  comments: Comment[];
  onVote?: (commentId: string, voteType: 'like' | 'dislike') => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onVote }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No comments yet. Be the first to share your thoughts!
      </div>
    );
  }

  // Sort comments by date (newest first)
  const sortedComments = [...comments].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="mt-4 space-y-0">
      {sortedComments.map((comment, index) => (
        <React.Fragment key={comment.id}>
          <CommentItem comment={comment} onVote={onVote} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CommentList;
