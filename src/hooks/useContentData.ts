
import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types/article';
import { Page, getPagesFromStorage } from '@/lib/types/page';
import { toast } from 'sonner';
import { 
  getArticlesFromStorage, 
  getDraftsFromStorage,
  getScheduledFromStorage,
  processScheduledArticles
} from '@/lib/utils/storage/articleStorage';

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

  const loadData = useCallback(() => {
    console.log('Loading content data from storage');
    setIsLoading(true);
    setError(null);
    
    try {
      // Load all content data from storage
      const published = getArticlesFromStorage();
      const drafts = getDraftsFromStorage();
      const scheduled = getScheduledFromStorage();
      const pages = getPagesFromStorage();
      
      console.log('Content loaded:', {
        publishedCount: published.length,
        draftsCount: drafts.length,
        scheduledCount: scheduled.length,
        pagesCount: pages.length
      });
      
      // Add sample articles for development/preview environments
      if ((published.length === 0 || window.location.hostname.includes('lovable')) && 
          process.env.NODE_ENV !== 'production') {
        console.log('Adding sample articles for development environment');
        const sampleArticles = getSampleArticles();
        setArticleList([...published, ...sampleArticles]);
      } else {
        setArticleList(published);
      }
      
      setDraftList(drafts);
      setScheduledList(scheduled);
      setPageList(pages);
      
      // Process any scheduled articles
      processScheduledArticles();
    } catch (err) {
      console.error('Error loading content data:', err);
      setError(err instanceof Error ? err : new Error('Unknown error loading content data'));
      toast.error('Failed to load content data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only run once on initial mount
    loadData();
    
    // Set up interval to process scheduled articles
    const intervalId = setInterval(() => {
      try {
        processScheduledArticles();
        // Only reload data if something was processed
        const newScheduled = getScheduledFromStorage();
        if (newScheduled.length !== scheduledList.length) {
          loadData();
        }
      } catch (err) {
        console.error('Error processing scheduled articles:', err);
      }
    }, 60000); // Check every minute
    
    // Set up event listeners for content updates
    const handleArticlesUpdated = () => {
      console.log('Articles updated event detected, reloading data');
      loadData();
    };
    
    const handleDraftsUpdated = () => {
      console.log('Drafts updated event detected, reloading data');
      loadData();
    };
    
    window.addEventListener('articlesUpdated', handleArticlesUpdated);
    window.addEventListener('draftsUpdated', handleDraftsUpdated);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('articlesUpdated', handleArticlesUpdated);
      window.removeEventListener('draftsUpdated', handleDraftsUpdated);
    };
  }, [loadData, scheduledList.length]);

  // Helper function to create sample articles for development/preview
  const getSampleArticles = (): Article[] => {
    return [
      {
        id: 'sample-1',
        title: 'Sample Article 1',
        slug: 'sample-article-1',
        author: 'Sample Author',
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        category: 'Blog',
        image: '',
        excerpt: 'This is a sample article for development and testing.',
        content: '<p>This is a sample article that appears in development and preview environments to help with testing and demonstration.</p>',
        featured: true,
        comments: [],
        tags: ['Sample', 'Development']
      },
      {
        id: 'sample-2',
        title: 'Sample Article 2',
        slug: 'sample-article-2',
        author: 'Sample Author',
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        category: 'Blog',
        image: '',
        excerpt: 'Another sample article for testing purposes.',
        content: '<p>This is another sample article for development and preview environments.</p>',
        featured: false,
        comments: [],
        tags: ['Sample', 'Testing']
      }
    ];
  };

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
