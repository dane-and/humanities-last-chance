
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

// Empty pre-baked articles for static deployment
const preBakedArticles: Article[] = [];

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
      // In preview mode, just set everything to empty arrays
      setArticleList([]);
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
      window.removeEventListener('articlesUpdated', handleArticlesUpdated);
      window.removeEventListener('draftsUpdated', handleDraftsUpdated);
    };
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
