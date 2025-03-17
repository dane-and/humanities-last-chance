
import { publishDraftByTitle } from '../lib/utils/storage/publishDraftStorage';
import { toast } from 'sonner';
import { getArticlesFromStorage } from '../lib/utils/storage/articleStorage';

/**
 * Script to publish the "Should Hamlet Take Prozac" draft
 */
export const publishHamletDraft = () => {
  const success = publishDraftByTitle('Should Hamlet Take Prozac');
  
  if (success) {
    toast.success('"Should Hamlet Take Prozac" has been published successfully');
    
    // Log the articles to verify the article was published
    console.log('Articles after publishing:', getArticlesFromStorage());
    
    // Force dispatch of the articlesUpdated event to ensure UI components refresh
    window.dispatchEvent(new CustomEvent('articlesUpdated'));
    
    return true;
  } else {
    toast.error('Could not find draft "Should Hamlet Take Prozac"');
    return false;
  }
};

/**
 * Convenience function to manually trigger the article published event
 * Can be called from the console to force UI refresh
 */
export const refreshArticles = () => {
  window.dispatchEvent(new CustomEvent('articlesUpdated'));
  toast.success('Articles refreshed');
};
