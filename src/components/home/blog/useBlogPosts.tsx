
import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types/article';
import { toast } from 'sonner';
import { fetchBlogPosts } from '@/lib/sanity';

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
        // Additional logging to debug category values
        console.log(`Post "${post.title}" has category:`, post.category);
        console.log(`Category type:`, typeof post.category);
        
        // Ensure we're preserving the exact category capitalization
        const category = post.category || 'Blog';
        console.log(`Using category "${category}" for post "${post.title}"`);
        
        // Match category to our allowed types without changing case
        let typedCategory: Article['category'];
        const lowerCaseCategory = category.toLowerCase();
        if (lowerCaseCategory === 'blog') {
          typedCategory = 'Blog';
        } else if (lowerCaseCategory === 'interview') {
          typedCategory = 'Interview';
        } else if (lowerCaseCategory === 'review') {
          typedCategory = 'Review';
        } else if (lowerCaseCategory === 'resource') {
          typedCategory = 'Resource';
        } else {
          typedCategory = 'Blog'; // Default
        }
        
        return {
          id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: post.title || "Untitled Post",
          slug: post.slug?.current || `post-${Date.now()}`,
          date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : new Date().toLocaleDateString(),
          category: typedCategory, // Use the correctly capitalized category
          image: post.mainImage?.asset?.url || '',
          imageCaption: post.mainImage?.caption || '',
          excerpt: post.excerpt || '',
          content: post.body || '', // Keep the portable text object as is
          featured: false,
          tags: post.tags || [],
        };
      });
      
      console.log("Formatted posts with preserved categories:", formattedPosts);
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
