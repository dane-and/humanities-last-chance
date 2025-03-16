
import React from 'react';
import { toast } from 'sonner';
import { Comment } from '@/lib/types/article';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

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
  const handleRemoveComment = (commentId: string) => {
    if (confirm('Are you sure you want to remove this comment?')) {
      try {
        // Remove comment using localStorage
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
        
        // Filter out the comment to be removed
        article.comments = article.comments.filter((comment: any) => comment.id !== commentId);
        articles[articleIndex] = article;
        
        // Save updated articles
        localStorage.setItem('hlc-articles', JSON.stringify(articles));
        
        toast.success("Comment removed successfully");
        onCommentRemoved();
      } catch (error) {
        console.error('Error removing comment:', error);
        toast.error("Failed to remove comment. Please try again.");
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
