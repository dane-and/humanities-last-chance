import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types/article';
import { Page } from '@/lib/types/page';
import { toast } from 'sonner';
import { fetchBlogPosts } from '@/lib/sanity';
import { getNormalizedCategory, getSafeCategoryString } from '@/lib/utils/categoryUtils';

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
          // Extract category string safely using utility function
          const categoryString = getSafeCategoryString(post.category);
          
          // Log category for debugging
          console.log(`Post "${post.title}" has category:`, {
            originalType: typeof post.category,
            originalValue: post.category,
            extractedString: categoryString
          });
          
          // Get normalized category
          const typedCategory = getNormalizedCategory(post.category);
          
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
