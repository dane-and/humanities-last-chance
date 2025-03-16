
import { getArticlesFromStorage, getScheduledFromStorage } from './articleRetrievalStorage';
import { saveArticlesToStorage, saveScheduledToStorage } from './articleSaveStorage';

/**
 * Function to publish a scheduled article if its publish date has arrived
 */
export const processScheduledArticles = (): void => {
  try {
    const scheduled = getScheduledFromStorage();
    const articles = getArticlesFromStorage();
    const now = new Date();
    
    // Find scheduled articles that should be published
    const toPublish = scheduled.filter(article => {
      if (!article.scheduledDate) return false;
      const publishDate = new Date(article.scheduledDate);
      return publishDate <= now;
    });
    
    if (toPublish.length > 0) {
      // Remove scheduledDate field before publishing
      const publishReady = toPublish.map(article => {
        const { scheduledDate, ...rest } = article;
        return rest;
      });
      
      // Add to published articles
      const updatedArticles = [...articles, ...publishReady];
      
      // Remove published articles from scheduled list
      const remainingScheduled = scheduled.filter(article => {
        if (!article.scheduledDate) return true;
        const publishDate = new Date(article.scheduledDate);
        return publishDate > now;
      });
      
      // Save changes
      saveArticlesToStorage(updatedArticles);
      saveScheduledToStorage(remainingScheduled);
    }
  } catch (e) {
    console.error('Error processing scheduled articles:', e);
  }
};
