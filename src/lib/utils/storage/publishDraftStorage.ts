
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
    
    if (!draftToPublish) {
      console.error(`No draft found with ID: ${id}`);
      return false;
    }
    
    console.log(`Found draft to publish:`, draftToPublish);
    
    // Convert draft to published article
    const publishedArticle: Article = {
      ...draftToPublish,
      isDraft: false,
      status: 'published',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    
    // Add to published articles
    articles.push(publishedArticle);
    
    // Remove from drafts
    const updatedDrafts = drafts.filter(draft => draft.id !== id);
    
    // Save both updated collections
    saveArticlesToStorage(articles);
    saveDraftsToStorage(updatedDrafts);
    
    console.log(`Draft published successfully. ${updatedDrafts.length} drafts remaining, ${articles.length} articles total.`);
    
    return true;
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
