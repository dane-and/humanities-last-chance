
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Comment } from '@/lib/types/article';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CommentItemProps {
  comment: Comment;
  onVote: (commentId: string, voteType: 'like' | 'dislike') => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onVote }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [voteType, setVoteType] = useState<'like' | 'dislike'>('like');
  const [isVoting, setIsVoting] = useState(false);

  const handleVoteClick = (type: 'like' | 'dislike') => {
    setVoteType(type);
    setShowConfirmDialog(true);
  };

  const confirmVote = () => {
    setIsVoting(true);
    onVote(comment.id, voteType);
    
    // Reset state after short delay to show visual feedback
    setTimeout(() => {
      setIsVoting(false);
      setShowConfirmDialog(false);
    }, 300);
  };

  return (
    <>
      <div className="bg-secondary/20 rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{comment.name}</h3>
            <p className="text-sm text-muted-foreground">{comment.date}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className={`flex items-center text-sm transition-colors ${
                voteType === 'like' && isVoting ? 'text-primary font-medium' : 'hover:text-primary'
              }`}
              onClick={() => handleVoteClick('like')}
              disabled={isVoting}
            >
              <ThumbsUp className={`h-4 w-4 mr-1 ${
                voteType === 'like' && isVoting ? 'animate-pulse' : ''
              }`} />
              <span>{comment.likes}</span>
            </button>
            <button 
              className={`flex items-center text-sm transition-colors ${
                voteType === 'dislike' && isVoting ? 'text-destructive font-medium' : 'hover:text-destructive'
              }`}
              onClick={() => handleVoteClick('dislike')}
              disabled={isVoting}
            >
              <ThumbsDown className={`h-4 w-4 mr-1 ${
                voteType === 'dislike' && isVoting ? 'animate-pulse' : ''
              }`} />
              <span>{comment.dislikes}</span>
            </button>
          </div>
        </div>
        <p className="mt-2">{comment.content}</p>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Vote</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {voteType} this comment from {comment.name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmVote}>
              Confirm {voteType}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CommentItem;
