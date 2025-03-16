
import { toast } from 'sonner';
import { Article } from '../../../lib/types/article';
import { getDraftsFromStorage, saveDraftsToStorage } from '../../../lib/utils/storage/articleStorage';

/**
 * Handle saving article as draft
 */
export const handleSaveAsDraft = async (
  formData: Article,
  selectedTags: string[],
  onNewArticle: () => void
): Promise<void> => {
  // Validate the minimum required fields
  if (!formData.title.trim()) {
    toast.error("Title is required even for drafts");
    return;
  }
  
  try {
    const drafts = getDraftsFromStorage();
    let updatedDrafts: Article[];
    
    // Check if we're updating an existing draft
    const existingDraftIndex = drafts.findIndex(draft => draft.id === formData.id);
    
    const draftArticle: Article = {
      ...formData,
      tags: selectedTags,
      isDraft: true,
      status: 'draft' as const, // Use const assertion to ensure literal type
      lastModified: new Date().toISOString()
    };
    
    if (existingDraftIndex >= 0) {
      // Update existing draft
      updatedDrafts = drafts.map((draft, index) => 
        index === existingDraftIndex ? draftArticle : draft
      );
    } else {
      // Create new draft
      const newDraft: Article = {
        ...draftArticle,
        id: formData.id || crypto.randomUUID(),
        comments: []
      };
      
      updatedDrafts = [...drafts, newDraft];
    }
    
    await saveDraftsToStorage(updatedDrafts);
    toast.success("Draft saved successfully");
    onNewArticle();
    
    // Dispatch custom event for other components to know data has changed
    const event = new CustomEvent('draftsUpdated');
    window.dispatchEvent(event);
  } catch (error) {
    console.error('Error saving draft:', error);
    toast.error("Error saving draft. Please try again.");
  }
};
