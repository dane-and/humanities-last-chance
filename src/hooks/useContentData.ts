
import { useState, useEffect } from 'react';
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

  const loadData = () => {
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
      
      setArticleList(published);
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
  };

  useEffect(() => {
    loadData();
    
    // Set up interval to process scheduled articles
    const intervalId = setInterval(() => {
      processScheduledArticles();
      loadData(); // Reload data after processing
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
  }, []);

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
