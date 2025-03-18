
import { toast } from 'sonner';
import { Article } from '../../types/article';
import { getDraftsFromStorage, saveDraftsToStorage } from '../storage/articleStorage';
import { getArticlesFromStorage, saveArticlesToStorage } from '../storage/articleStorage';

/**
 * Publishes a draft by ID
 * This moves a draft from the drafts storage to the published articles storage
 */
export const publishDraft = (id: string): boolean => {
  try {
    console.log(`Publishing draft with ID: ${id}`);
    
    // Get current drafts and articles
    const drafts = getDraftsFromStorage();
    const articles = getArticlesFromStorage();
    
    // Find the draft to publish
    const draftToPublish = drafts.find(draft => draft.id === id);
    
    // If not a draft, it might be a direct publish
    let articleToPublish = draftToPublish;
    
    // Proceed with publishing
    if (articleToPublish) {
      console.log(`Found draft to publish:`, articleToPublish);
      
      // Get current date and time with 12-hour format
      const now = new Date();
      const formattedDateTime = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      // Convert draft to published article
      const publishedArticle: Article = {
        ...articleToPublish,
        isDraft: false,
        status: 'published',
        date: formattedDateTime
      };
      
      // Add to published articles
      articles.push(publishedArticle);
      
      // Remove from drafts if it was a draft
      if (draftToPublish) {
        const updatedDrafts = drafts.filter(draft => draft.id !== id);
        saveDraftsToStorage(updatedDrafts);
      }
      
      // Sort articles by date (newest first) before saving
      const sortedArticles = [...articles].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      // Save sorted articles
      saveArticlesToStorage(sortedArticles);
      
      console.log(`Article published successfully. ${articles.length} articles total.`);
      
      return true;
    } else {
      console.error(`No article found with ID: ${id}`);
      return false;
    }
  } catch (error) {
    console.error("Error publishing draft:", error);
    return false;
  }
};

/**
 * Publishes a draft by title (case insensitive search)
 * This is useful for programmatic publishing of specific drafts
 */
export const publishDraftByTitle = (title: string): boolean => {
  try {
    console.log(`Looking for draft with title: "${title}"`);
    
    // Get current drafts
    const drafts = getDraftsFromStorage();
    
    // Find the draft to publish (case insensitive)
    const draftToPublish = drafts.find(
      draft => draft.title.toLowerCase() === title.toLowerCase()
    );
    
    if (!draftToPublish) {
      console.error(`No draft found with title: "${title}"`);
      return false;
    }
    
    console.log(`Found draft with title "${title}" (ID: ${draftToPublish.id})`);
    
    // Publish the draft using the ID
    return publishDraft(draftToPublish.id);
  } catch (error) {
    console.error(`Error publishing draft with title "${title}":`, error);
    return false;
  }
};

/**
 * Direct publish functionality for articles that aren't drafts yet
 * Allows publishing directly from the article form
 */
export const publishDirectly = (article: Article): boolean => {
  try {
    console.log(`Publishing article directly:`, article);
    
    // Get current articles
    const articles = getArticlesFromStorage();
    
    // Get current date and time with 12-hour format
    const now = new Date();
    const formattedDateTime = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    // Prepare the article for publishing
    const publishedArticle: Article = {
      ...article,
      id: article.id || crypto.randomUUID(),
      isDraft: false,
      status: 'published',
      date: formattedDateTime,
      comments: article.comments || []
    };
    
    // Add to published articles
    articles.push(publishedArticle);
    
    // Sort articles by date (newest first) before saving
    const sortedArticles = [...articles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Save sorted articles
    saveArticlesToStorage(sortedArticles);
    
    console.log(`Article published directly. ${sortedArticles.length} articles total.`);
    
    return true;
  } catch (error) {
    console.error("Error publishing article directly:", error);
    return false;
  }
};
