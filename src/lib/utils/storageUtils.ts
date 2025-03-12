
import { Article, Comment, defaultArticles } from '../types/article';

/**
 * Gets articles from local storage
 */
export const getArticlesFromStorage = (): Article[] => {
  try {
    // Check if we're in a browser environment (for SSR compatibility)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedArticles = localStorage.getItem('admin-articles');
      return savedArticles ? JSON.parse(savedArticles) : defaultArticles;
    }
    return defaultArticles;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultArticles;
  }
};

/**
 * Saves articles to local storage
 */
export const saveArticlesToStorage = (articles: Article[]): void => {
  try {
    // Check if we're in a browser environment (for SSR compatibility)
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('admin-articles', JSON.stringify(articles));
    }
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};

/**
 * Adds a comment to an article
 */
export const addCommentToArticle = (
  articleId: string, 
  comment: Omit<Comment, 'id' | 'articleId' | 'date' | 'likes' | 'dislikes'>
): boolean => {
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
  } catch (e) {
    console.error('Error adding comment:', e);
    return false;
  }
};

/**
 * Removes a comment from an article
 */
export const removeCommentFromArticle = (articleId: string, commentId: string): boolean => {
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
  } catch (e) {
    console.error('Error removing comment:', e);
    return false;
  }
};

/**
 * Updates a like or dislike on a comment
 */
export const updateCommentVote = (
  articleId: string, 
  commentId: string, 
  voteType: 'like' | 'dislike'
): boolean => {
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
  } catch (e) {
    console.error('Error updating comment vote:', e);
    return false;
  }
};
