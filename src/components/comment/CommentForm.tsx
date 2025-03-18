
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { sanityClient } from '@/lib/sanity';

interface CommentFormProps {
  articleId: string;
  onCommentSubmitted: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId, onCommentSubmitted }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
      // Create a new comment object
      const newComment = {
        id: crypto.randomUUID(),
        name: name.trim(),
        content: content.trim(),
        date: new Date().toISOString(),
        likes: 0,
        dislikes: 0
      };
      
      // Fetch the current document to get its _id and _rev
      const post = await sanityClient.fetch(
        `*[_type == "post" && _id == $id][0]`,
        { id: articleId }
      );
      
      if (!post) {
        throw new Error('Article not found in Sanity');
      }
      
      // Update the post with the new comment
      const result = await sanityClient
        .patch(articleId)
        .setIfMissing({ comments: [] })
        .append('comments', [newComment])
        .commit();
      
      toast.success("Your comment has been added");
      
      // Reset form fields
      setName('');
      setContent('');
      
      // Notify parent component to refresh comments
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
          required
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
          required
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Posting...' : 'Submit Comment'}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
