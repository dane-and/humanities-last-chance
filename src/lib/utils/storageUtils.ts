
import { Article, Comment, defaultArticles } from '../types/article';
import { createArticle, updateArticle, deleteArticle } from '../api/articleApi';

const STORAGE_KEY = 'hlc-admin-articles';

/**
 * Gets articles from local storage (fallback method)
 */
export const getArticlesFromStorage = (): Article[] => {
  try {
    // Check if we're in a browser environment (for SSR compatibility)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedArticles = localStorage.getItem(STORAGE_KEY);
      return savedArticles ? JSON.parse(savedArticles) : defaultArticles;
    }
    return defaultArticles;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultArticles;
  }
};

/**
 * Saves articles to local storage AND to the server
 */
export const saveArticlesToStorage = async (articles: Article[]): Promise<void> => {
  try {
    // Check if we're in a browser environment (for SSR compatibility)
    if (typeof window !== 'undefined' && window.localStorage) {
      // Save to localStorage as a fallback
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
      
      // Create a download data file to allow manual backup
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(articles, null, 2));
      
      // Create and dispatch a custom event that the admin can listen for
      const event = new CustomEvent('articlesSaved', { 
        detail: { 
          timestamp: new Date().toISOString(),
          articleCount: articles.length,
          dataUrl: dataStr
        } 
      });
      window.dispatchEvent(event);
      
      // Note: Server-side saving happens elsewhere now through API calls
    }
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};

/**
 * Adds a comment to an article via API
 */
export const addCommentToArticle = async (
  articleId: string, 
  comment: Omit<Comment, 'id' | 'articleId' | 'date' | 'likes' | 'dislikes'>
): Promise<boolean> => {
  try {
    // Use the API endpoint
    const API_BASE_URL = '/api';
    const response = await fetch(`${API_BASE_URL}/comments.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        articleId,
        name: comment.name,
        content: comment.content
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error adding comment:', errorData.error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error('Error adding comment:', e);
    
    // Fallback to local storage if API fails
    try {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        const articles = getArticlesFromStorage();
        
        const articleIndex = articles.findIndex(article => article.id === articleId);
        if (articleIndex === -1) return false;
        
        const article = articles[articleIndex];
        
        // Initialize comments array if it doesn't exist
        if (!article.comments) {
          article.comments = [];
        }
        
        // Create new comment
        const newComment: Comment = {
          id: Date.now().toString(),
          articleId,
          name: comment.name,
          content: comment.content,
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          likes: 0,
          dislikes: 0
        };
        
        article.comments.push(newComment);
        articles[articleIndex] = article;
        
        saveArticlesToStorage(articles);
        return true;
      }
      return false;
    } catch (fallbackError) {
      console.error('Fallback error adding comment:', fallbackError);
      return false;
    }
  }
};

/**
 * Removes a comment from an article via API
 */
export const removeCommentFromArticle = async (articleId: string, commentId: string): Promise<boolean> => {
  try {
    // Use the API endpoint
    const API_BASE_URL = '/api';
    const response = await fetch(`${API_BASE_URL}/comments.php/${commentId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error removing comment:', errorData.error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error('Error removing comment:', e);
    
    // Fallback to local storage if API fails
    try {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        const articles = getArticlesFromStorage();
        
        const articleIndex = articles.findIndex(article => article.id === articleId);
        if (articleIndex === -1) return false;
        
        const article = articles[articleIndex];
        
        if (!article.comments) return false;
        
        article.comments = article.comments.filter(comment => comment.id !== commentId);
        articles[articleIndex] = article;
        
        saveArticlesToStorage(articles);
        return true;
      }
      return false;
    } catch (fallbackError) {
      console.error('Fallback error removing comment:', fallbackError);
      return false;
    }
  }
};

/**
 * Updates a like or dislike on a comment via API
 */
export const updateCommentVote = async (
  articleId: string, 
  commentId: string, 
  voteType: 'like' | 'dislike'
): Promise<boolean> => {
  try {
    // Use the API endpoint
    const API_BASE_URL = '/api';
    const response = await fetch(`${API_BASE_URL}/comments.php/${commentId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ voteType }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error updating vote:', errorData.error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error('Error updating comment vote:', e);
    
    // Fallback to local storage if API fails
    try {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        const articles = getArticlesFromStorage();
        
        const articleIndex = articles.findIndex(article => article.id === articleId);
        if (articleIndex === -1) return false;
        
        const article = articles[articleIndex];
        
        if (!article.comments) return false;
        
        const commentIndex = article.comments.findIndex(comment => comment.id === commentId);
        if (commentIndex === -1) return false;
        
        const comment = article.comments[commentIndex];
        
        if (voteType === 'like') {
          comment.likes += 1;
        } else {
          comment.dislikes += 1;
        }
        
        article.comments[commentIndex] = comment;
        articles[articleIndex] = article;
        
        saveArticlesToStorage(articles);
        return true;
      }
      return false;
    } catch (fallbackError) {
      console.error('Fallback error updating vote:', fallbackError);
      return false;
    }
  }
};

/**
 * Export articles data as JSON file
 */
export const exportArticlesData = (): void => {
  try {
    const articles = getArticlesFromStorage();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(articles, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `humanities-last-chance-articles-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  } catch (e) {
    console.error('Error exporting articles data:', e);
  }
};

/**
 * Import articles data from JSON file via API
 */
export const importArticlesData = async (jsonData: string): Promise<boolean> => {
  try {
    // First, validate the JSON data
    const articles = JSON.parse(jsonData) as Article[];
    if (!Array.isArray(articles)) {
      throw new Error('Invalid data format');
    }
    
    // Import via API if possible
    try {
      const API_BASE_URL = '/api';
      
      // Create FormData for file upload
      const formData = new FormData();
      const blob = new Blob([jsonData], { type: 'application/json' });
      formData.append('dataFile', blob, 'articles-import.json');
      
      const response = await fetch(`${API_BASE_URL}/import.php`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API import failed:', errorData.error);
        throw new Error(errorData.error);
      }
      
      return true;
    } catch (apiError) {
      console.error('Error importing via API:', apiError);
      
      // Fallback to localStorage
      console.log('Falling back to localStorage import');
      saveArticlesToStorage(articles);
      return true;
    }
  } catch (e) {
    console.error('Error importing articles data:', e);
    return false;
  }
};
