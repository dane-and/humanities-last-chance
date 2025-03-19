
import React from 'react';
import { Comment } from '@/lib/types/article';
import { CommentForm, CommentList } from '@/components/comment';
import { MessageCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
  return (
    <div id="comments" className="mt-12 pt-8 border-t">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5" />
        <h2 className="text-2xl font-bold">Comments ({comments?.length || 0})</h2>
      </div>
      
      <Separator className="mb-6" />
      
      <CommentForm 
        articleId={articleId} 
        onCommentSubmitted={onCommentAdded} 
      />
      
      <CommentList 
        comments={comments || []} 
      />
    </div>
  );
};

export default ArticleComments;
