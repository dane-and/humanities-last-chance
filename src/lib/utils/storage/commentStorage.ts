
import { Article, Comment } from '../../types/article';
import { getArticlesFromStorage, saveArticlesToStorage } from './articleStorage';

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
