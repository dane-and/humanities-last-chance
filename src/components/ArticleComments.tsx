
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Comment } from '@/lib/types/article';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

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
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Add comment using localStorage
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
        article.comments = [];
      }
      
      // Create new comment
      const newComment: Comment = {
        id: crypto.randomUUID(),
        articleId,
        name: name.trim(),
        content: content.trim(),
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        likes: 0,
        dislikes: 0
      };
      
      article.comments.push(newComment);
      articles[articleIndex] = article;
      
      // Save updated articles
      localStorage.setItem('hlc-articles', JSON.stringify(articles));
      
      toast.success("Your comment has been added");
      
      setName('');
      setContent('');
      onCommentAdded();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error("Failed to add your comment. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

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
      
      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            maxLength={50}
          />
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Your Comment
          </label>
          <Textarea
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            maxLength={1000}
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </form>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-secondary/20 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{comment.name}</h3>
                  <p className="text-sm text-muted-foreground">{comment.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    className="flex items-center text-sm hover:text-primary transition-colors"
                    onClick={() => handleVote(comment.id, 'like')}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{comment.likes}</span>
                  </button>
                  <button 
                    className="flex items-center text-sm hover:text-destructive transition-colors"
                    onClick={() => handleVote(comment.id, 'dislike')}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>{comment.dislikes}</span>
                  </button>
                </div>
              </div>
              <p className="mt-2">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
};

export default ArticleComments;
