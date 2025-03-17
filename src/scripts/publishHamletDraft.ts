
import { publishDraftByTitle } from '../lib/utils/storage/publishDraftStorage';
import { toast } from 'sonner';

/**
 * Script to publish the "Should Hamlet Take Prozac?" draft
 */
export const publishHamletDraft = () => {
  console.log('Attempting to publish "Should Hamlet Take Prozac?" draft...');
  
  const success = publishDraftByTitle('Should Hamlet Take Prozac?');
  
  if (success) {
    console.log('Successfully published "Should Hamlet Take Prozac?" draft');
    toast.success('"Should Hamlet Take Prozac?" has been published successfully');
    
    // Dispatch the articlesUpdated event to refresh UI components
    window.dispatchEvent(new CustomEvent('articlesUpdated'));
    
    return true;
  } else {
    console.error('Could not find draft "Should Hamlet Take Prozac?"');
    toast.error('Could not find draft "Should Hamlet Take Prozac?"');
    return false;
  }
};

/**
 * Convenience function to manually trigger the article published event
 * Can be called from the console to force UI refresh
 */
export const refreshArticles = () => {
  console.log('Manually refreshing articles...');
  window.dispatchEvent(new CustomEvent('articlesUpdated'));
  toast.success('Articles refreshed');
};
