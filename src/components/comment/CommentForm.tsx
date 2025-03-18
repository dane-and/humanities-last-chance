
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface CommentFormProps {
  articleId: string;
  onCommentSubmitted: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId, onCommentSubmitted }) => {
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
      const newComment = {
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
      onCommentSubmitted();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error("Failed to add your comment. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
  );
};

export default CommentForm;
