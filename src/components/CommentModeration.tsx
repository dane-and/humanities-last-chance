
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Comment } from '@/lib/types/article';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { removeCommentFromArticle } from '@/lib/utils/storage/commentStorage';

interface CommentModerationProps {
  articleId: string;
  comments: Comment[];
  onCommentRemoved: () => void;
}

const CommentModeration: React.FC<CommentModerationProps> = ({ 
  articleId, 
  comments,
  onCommentRemoved
}) => {
  const { toast } = useToast();

  const handleRemoveComment = (commentId: string) => {
    if (confirm('Are you sure you want to remove this comment?')) {
      const success = removeCommentFromArticle(articleId, commentId);
      
      if (success) {
        toast({
          title: "Success",
          description: "Comment removed successfully",
        });
        onCommentRemoved();
      } else {
        toast({
          title: "Error",
          description: "Failed to remove comment. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Comments</h3>
      
      {comments && comments.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {comments.map(comment => (
            <div 
              key={comment.id} 
              className="p-3 border rounded-md bg-secondary/10 flex justify-between items-start"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{comment.name}</h4>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
                <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                  <span>Likes: {comment.likes}</span>
                  <span>Dislikes: {comment.dislikes}</span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-destructive"
                onClick={() => handleRemoveComment(comment.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">No comments to moderate.</p>
      )}
    </div>
  );
};

export default CommentModeration;
