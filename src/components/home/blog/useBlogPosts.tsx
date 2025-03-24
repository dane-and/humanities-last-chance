import { useState, useEffect, useCallback } from 'react';
import { Article, defaultArticles } from '@/lib/types/article';
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
      
      // Filter to only include posts with category "Blog" (case-insensitive)
      const filtered = posts.filter((post: any) =>
        post.category?.toLowerCase() === 'blog'
      );
      
      console.log(`Filtered ${filtered.length} blog posts from ${posts.length} total posts`);
      
      const formattedPosts: Article[] = filtered.map((post: any) => ({
        id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: post.title || "Untitled Post",
        slug: post.slug?.current || `post-${Date.now()}`,
        date: post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : new Date().toLocaleDateString(),
        category: post.category || 'Blog',
        image: post.mainImage?.asset?.url || '',
        imageCaption: post.mainImage?.caption || '',
        excerpt: post.excerpt || '',
        content: post.body || '',
        featured: false,
        tags: Array.isArray(post.tags) ? post.tags.map(t => t.label) : [],
        publishedAt: post.publishedAt || post._createdAt || new Date().toISOString(),
      }));

      const sortedBlogPosts = formattedPosts.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });

      console.log(`Setting ${sortedBlogPosts.length} filtered and sorted blog posts`);
      setBlogPosts(sortedBlogPosts);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error fetching blog posts';
      console.error('Error fetching blog posts:', errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));

      console.log("Error fetching from Sanity, using empty articles array");
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
