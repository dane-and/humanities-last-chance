
import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types/article';
import { Page } from '@/lib/types/page';
import { toast } from 'sonner';
import { fetchBlogPosts } from '@/lib/sanity';

export const useContentData = () => {
  // Articles state
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [draftList, setDraftList] = useState<Article[]>([]);
  const [scheduledList, setScheduledList] = useState<Article[]>([]);
  
  // Pages state
  const [pageList, setPageList] = useState<Page[]>([]);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    console.log('Loading content data from Sanity');
    setIsLoading(true);
    setError(null);
    
    try {
      // Load articles from Sanity
      const posts = await fetchBlogPosts();
      
      if (posts && posts.length > 0) {
        // Convert Sanity posts to our Article format
        const formattedArticles = posts.map((post: any) => {
          // Ensure we're using the correct category type - safely handle non-string values
          let typedCategory: Article['category'];
          
          // First ensure we have a valid string for the category
          const rawCategory = post.category;
          
          // Log category for debugging
          console.log(`Post "${post.title}" has category type: ${typeof rawCategory}, value:`, rawCategory);
          
          // Safely extract category string
          let categoryString = 'Blog'; // Default
          
          if (typeof rawCategory === 'string') {
            categoryString = rawCategory;
          } else if (Array.isArray(rawCategory) && rawCategory.length > 0) {
            // If it's an array, take the first element (if it's a string)
            if (typeof rawCategory[0] === 'string') {
              categoryString = rawCategory[0];
            }
          } else if (rawCategory && typeof rawCategory === 'object') {
            // If it's an object with a name/title property
            if (typeof rawCategory.name === 'string') {
              categoryString = rawCategory.name;
            } else if (typeof rawCategory.title === 'string') {
              categoryString = rawCategory.title;
            }
          }
          
          // Process the category string (now safely a string)
          const lowerCaseCategory = categoryString.toLowerCase();
          
          // Handle plural and singular forms of categories
          if (lowerCaseCategory === 'blog' || lowerCaseCategory === 'blogs') {
            typedCategory = 'Blog';
          } else if (lowerCaseCategory === 'interview' || lowerCaseCategory === 'interviews') {
            typedCategory = 'Interview';
          } else if (lowerCaseCategory === 'review' || lowerCaseCategory === 'reviews') {
            typedCategory = 'Review';
          } else if (lowerCaseCategory === 'resource' || lowerCaseCategory === 'resources') {
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
            category: typedCategory,
            image: post.mainImage?.asset?.url || '',
            imageCaption: post.mainImage?.caption || '',
            excerpt: post.excerpt || '',
            content: post.body || '',
            featured: false,
            tags: post.tags || [],
          };
        });
        
        setArticleList(formattedArticles);
      } else {
        // Keep empty arrays until Sanity integration is complete
        setArticleList([]);
      }
      
      setDraftList([]);
      setScheduledList([]);
      setPageList([]);
    } catch (err) {
      console.error('Error loading content data:', err);
      setError(err instanceof Error ? err : new Error('Unknown error loading content data'));
      toast.error('Failed to load content data');
      
      // Use empty arrays on error
      setArticleList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only run once on initial mount
    loadData();
  }, [loadData]);

  return {
    articleList,
    draftList,
    scheduledList,
    pageList,
    setArticleList,
    setDraftList,
    setScheduledList,
    setPageList,
    loadData,
    isLoading,
    error
  };
};
