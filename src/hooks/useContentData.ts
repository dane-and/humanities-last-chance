import { useState, useEffect } from 'react';
import { Article } from '@/lib/types/article';
import { Page, getPagesFromStorage } from '@/lib/types/page';
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

  const loadData = () => {
    // Load all content data from storage
    const published = getArticlesFromStorage();
    const drafts = getDraftsFromStorage();
    const scheduled = getScheduledFromStorage();
    const pages = getPagesFromStorage();
    
    setArticleList(published);
    setDraftList(drafts);
    setScheduledList(scheduled);
    setPageList(pages);
    
    // Process any scheduled articles
    processScheduledArticles();
  };

  useEffect(() => {
    loadData();
    
    // Set up interval to process scheduled articles
    const intervalId = setInterval(() => {
      processScheduledArticles();
      loadData(); // Reload data after processing
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
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
    loadData
  };
};
