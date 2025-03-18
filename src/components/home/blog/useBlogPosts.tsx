
import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types/article';
import { toast } from 'sonner';
import { fetchBlogPosts, urlFor } from '@/lib/sanity';

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = useCallback(async () => {
    console.log("Fetching blog posts from Sanity...");
    setIsLoading(true);
    setError(null);
    
    try {
      const posts = await fetchBlogPosts();
      
      // Convert Sanity posts format to our Article type
      const formattedPosts: Article[] = posts.map((post: any) => {
        // Log each post to see what category values we're getting from Sanity
        console.log(`Post "${post.title}" has category:`, post.category);
        
        return {
          id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: post.title || "Untitled Post",
          slug: post.slug?.current || `post-${Date.now()}`,
          date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : new Date().toLocaleDateString(),
          category: post.category || 'Blog', // Ensure we're using the exact case from Sanity
          image: post.mainImage?.asset?.url || '',
          imageCaption: post.mainImage?.caption || '',
          excerpt: post.excerpt || '',
          content: post.body || '', // Keep the portable text object as is
          featured: false,
          tags: post.tags || [],
        };
      });
      
      console.log("Formatted posts:", formattedPosts);
      setBlogPosts(formattedPosts);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error fetching blog posts';
      console.error('Error fetching blog posts:', errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));
      setBlogPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  return { blogPosts, isLoading, error, fetchBlogPosts: fetchPosts };
};
