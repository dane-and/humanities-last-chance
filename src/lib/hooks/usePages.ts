
import { useState, useEffect } from 'react';
import { Page, getPagesFromStorage, savePagesToStorage } from '../types/page';

export const usePages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadPages = () => {
    // Get the pages from storage
    const storedPages = getPagesFromStorage();
    setPages(storedPages);
    setIsLoading(false);
  };
  
  useEffect(() => {
    loadPages();
  }, []);
  
  const updatePage = (updatedPage: Page) => {
    const updatedPages = pages.map(page => 
      page.id === updatedPage.id ? { ...updatedPage, lastUpdated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) } : page
    );
    
    setPages(updatedPages);
    savePagesToStorage(updatedPages);
    return true;
  };
  
  const getPageBySlug = (slug: string): Page | undefined => {
    return pages.find(page => page.slug === slug);
  };
  
  const refreshPages = () => {
    loadPages();
  };
  
  return {
    pages,
    isLoading,
    updatePage,
    getPageBySlug,
    refreshPages
  };
};
