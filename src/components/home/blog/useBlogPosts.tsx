
import { useState, useEffect, useCallback } from 'react';
import { Article, defaultArticles } from '@/lib/types/article';
import { toast } from 'sonner';
import { fetchBlogPosts } from '@/lib/sanity';

/**
 * Safely extracts a category string from various possible formats
 */
const getCategoryString = (rawCategory: any): string => {
  // If null or undefined, return default
  if (rawCategory === null || rawCategory === undefined) {
    return '';
  }
  
  // If it's already a string
  if (typeof rawCategory === 'string') {
    return rawCategory;
  }
  
  // If it's an array, take the first string element
  if (Array.isArray(rawCategory) && rawCategory.length > 0) {
    if (typeof rawCategory[0] === 'string') {
      return rawCategory[0];
    }
  }
  
  // If it's an object with a name or title property
  if (rawCategory && typeof rawCategory === 'object') {
    if (typeof rawCategory.name === 'string') {
      return rawCategory.name;
    }
    if (typeof rawCategory.title === 'string') {
      return rawCategory.title;
    }
  }
  
  // Default fallback
  return '';
};

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
      const formattedPosts: Article[] = posts
        // Only include posts that are categorized as 'Blog' (case-insensitive)
        .filter((post: any) => {
          // Safely extract category string
          const categoryStr = getCategoryString(post.category);
          
          // If we couldn't extract a category, log and skip this post
          if (!categoryStr) {
            console.warn(`Post "${post.title}" has invalid category, skipping:`, post.category);
            return false;
          }
          
          // Log the extracted category
          console.log(`Post "${post.title}" has extracted category: "${categoryStr}"`);
          
          // We use lowercase comparison for filtering
          return categoryStr.toLowerCase() === 'blog';
        })
        .map((post: any) => {
          // Additional logging to debug category values and dates
          console.log(`Blog post "${post.title}" has category:`, post.category);
          console.log(`Blog post "${post.title}" has publishedAt:`, post.publishedAt);
          
          // Always use the original publishedAt date from Sanity
          const publishedDate = post.publishedAt 
            ? new Date(post.publishedAt) 
            : (post._createdAt ? new Date(post._createdAt) : new Date());
          
          console.log(`Post "${post.title}" using date:`, publishedDate.toISOString());
          
          return {
            id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: post.title || "Untitled Post",
            slug: post.slug?.current || `post-${Date.now()}`,
            date: publishedDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            publishedAt: post.publishedAt || post._createdAt || new Date().toISOString(),
            category: 'Blog', // Use the correctly capitalized category
            image: post.mainImage?.asset?.url || '',
            imageCaption: post.mainImage?.caption || '',
            excerpt: post.excerpt || '',
            content: post.body || '', // Keep the portable text object as is
            featured: false,
            tags: post.tags || [],
          };
        });
      
      console.log("Formatted blog posts after filtering:", formattedPosts);
      console.log("Number of blog posts after filtering:", formattedPosts.length);
      
      // If no posts are returned from Sanity, use the default articles
      if (formattedPosts.length === 0) {
        console.log("No blog posts found after filtering, using default articles");
        setBlogPosts(defaultArticles.filter(article => {
          // Type guard for the article.category
          if (typeof article.category !== 'string') {
            return false;
          }
          return article.category.toLowerCase() === 'blog';
        }));
      } else {
        // Explicitly sort the posts by publishedAt date (newest first)
        // but ensure we're using the original date from Sanity
        const sortedPosts = formattedPosts.sort((a, b) => {
          const dateA = new Date(a.publishedAt || '');
          const dateB = new Date(b.publishedAt || '');
          return dateB.getTime() - dateA.getTime();
        });
        
        console.log("Blog posts sorted by original publishedAt date (newest first):", 
          sortedPosts.map(p => ({ 
            title: p.title, 
            date: p.date, 
            publishedAt: p.publishedAt 
          }))
        );
        
        setBlogPosts(sortedPosts);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error fetching blog posts';
      console.error('Error fetching blog posts:', errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));
      
      // Use default articles on error, but filter for blog category only
      console.log("Error fetching from Sanity, using default articles");
      setBlogPosts(defaultArticles.filter(article => {
        // Type guard for the article.category
        if (typeof article.category !== 'string') {
          return false;
        }
        return article.category.toLowerCase() === 'blog';
      }));
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  return { blogPosts, isLoading, error, fetchBlogPosts: fetchPosts };
};
