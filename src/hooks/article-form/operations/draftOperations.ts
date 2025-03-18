
import { toast } from 'sonner';
import { Article } from '../../../lib/types/article';
import { getDraftsFromStorage, saveDraftsToStorage } from '../../../lib/utils/storage/articleStorage';
import { publishDraft, publishDirectly } from '../../../lib/utils/storage/publishDraftStorage';

/**
 * Handle saving article as draft - only triggered by the Save Draft button
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

/**
 * Handle publishing a draft article
 */
export const handlePublishDraft = async (
  formData: Article,
  selectedTags: string[],
  onNewArticle: () => void
): Promise<void> => {
  // Validate the minimum required fields
  if (!formData.title.trim()) {
    toast.error("Title is required for publishing");
    return;
  }
  
  if (!formData.content.trim()) {
    toast.error("Content is required for publishing");
    return;
  }
  
  try {
    // If it's already a draft (has an ID and is in drafts storage), publish it as a draft
    if (formData.id && formData.isDraft) {
      // First save any unsaved changes
      await handleSaveAsDraft(formData, selectedTags, () => {});
      
      // Then publish the draft
      const success = publishDraft(formData.id);
      
      if (success) {
        toast.success("Article published successfully");
        onNewArticle();
      } else {
        toast.error("Error publishing article");
      }
    } else {
      // It's a new article, publish directly
      const articleToPublish: Article = {
        ...formData,
        id: formData.id || crypto.randomUUID(),
        tags: selectedTags,
        comments: []
      };
      
      const success = publishDirectly(articleToPublish);
      
      if (success) {
        toast.success("Article published successfully");
        onNewArticle();
      } else {
        toast.error("Error publishing article");
      }
    }
    
    // Dispatch custom event for other components to know data has changed
    const event = new CustomEvent('articlesUpdated');
    window.dispatchEvent(event);
  } catch (error) {
    console.error('Error publishing article:', error);
    toast.error("Error publishing article. Please try again.");
  }
};
