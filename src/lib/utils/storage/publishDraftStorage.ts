
import { Article } from '../../types/article';
import { getDraftsFromStorage, getArticlesFromStorage } from './articleRetrievalStorage';
import { saveArticlesToStorage, saveDraftsToStorage } from './articleSaveStorage';
import { toast } from 'sonner';

/**
 * Publish a draft article by moving it from drafts to published articles
 * @param draftId ID of the draft to publish
 * @returns boolean indicating success or failure
 */
export const publishDraft = (draftId: string): boolean => {
  try {
    console.log(`Publishing draft with ID: ${draftId}`);
    
    // Get current drafts and articles
    const drafts = getDraftsFromStorage();
    const articles = getArticlesFromStorage();
    
    console.log(`Found ${drafts.length} drafts and ${articles.length} articles`);
    
    // Find the draft by ID
    const draftIndex = drafts.findIndex(draft => draft.id === draftId);
    
    if (draftIndex === -1) {
      console.error(`Draft with ID ${draftId} not found`);
      return false;
    }
    
    // Get the draft to publish
    const draftToPublish = {...drafts[draftIndex]};
    console.log('Draft to publish:', draftToPublish);
    
    // Remove the draft-specific properties
    const { isDraft, status, ...publishReady } = draftToPublish;
    
    // Set the publication date to now if not already set
    if (!publishReady.date) {
      const now = new Date();
      publishReady.date = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    // Add to published articles
    articles.push(publishReady);
    console.log('Updated articles list:', articles);
    
    // Remove from drafts
    drafts.splice(draftIndex, 1);
    
    // Save both lists
    saveArticlesToStorage(articles);
    saveDraftsToStorage(drafts);
    
    console.log(`Published draft "${publishReady.title}" successfully`);
    
    // Dispatch events to notify other components
    window.dispatchEvent(new CustomEvent('articlesUpdated'));
    window.dispatchEvent(new CustomEvent('draftsUpdated'));
    
    return true;
  } catch (error) {
    console.error('Error publishing draft:', error);
    return false;
  }
};

/**
 * Publish a draft by title (searches for matching draft)
 * @param title Title of the draft to publish
 * @returns boolean indicating success or failure
 */
export const publishDraftByTitle = (title: string): boolean => {
  try {
    console.log(`Looking for draft with title: "${title}"`);
    
    // Get current drafts
    const drafts = getDraftsFromStorage();
    console.log('Available drafts:', drafts);
    
    // Find draft with matching title (case insensitive)
    const draft = drafts.find(
      d => d.title.toLowerCase() === title.toLowerCase()
    );
    
    if (!draft) {
      console.error(`Draft with title "${title}" not found`);
      return false;
    }
    
    console.log(`Found draft with title "${title}" and ID ${draft.id}`);
    
    // First check if an article with this title already exists
    const articles = getArticlesFromStorage();
    const articleExists = articles.some(
      article => article.title.toLowerCase() === title.toLowerCase()
    );
    
    if (articleExists) {
      console.warn(`Article with title "${title}" already exists in published articles`);
      toast.warning(`Article "${title}" is already published`);
      return false;
    }
    
    // Publish the found draft
    return publishDraft(draft.id);
  } catch (error) {
    console.error('Error publishing draft by title:', error);
    return false;
  }
};
