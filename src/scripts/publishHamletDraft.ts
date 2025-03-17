
import { publishDraftByTitle } from '../lib/utils/storage/publishDraftStorage';
import { toast } from 'sonner';

/**
 * Script to publish the "Should Hamlet Take Prozac" draft
 */
export const publishHamletDraft = () => {
  const success = publishDraftByTitle('Should Hamlet Take Prozac');
  
  if (success) {
    toast.success('"Should Hamlet Take Prozac" has been published successfully');
    return true;
  } else {
    toast.error('Could not find draft "Should Hamlet Take Prozac"');
    return false;
  }
};
