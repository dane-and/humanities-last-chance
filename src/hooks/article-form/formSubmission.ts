
import { toast } from 'sonner';
import { Article } from '../../lib/types/article';
import { ArticleFormProps } from './types';
import { 
  saveArticlesToStorage, 
  saveDraftsToStorage,
  saveScheduledToStorage,
  getDraftsFromStorage,
  getScheduledFromStorage
} from '../../lib/utils/storage/articleStorage';
import { createArticle, updateArticle, deleteArticle } from '../../lib/api/article/crudOperations';

export const useArticleFormSubmission = (
  formData: Article,
  selectedTags: string[],
  { articleList, selectedArticle, onArticleListUpdate, onNewArticle }: ArticleFormProps
) => {
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error("Content is required");
      return;
    }
    
    // Prepare updated article with selected tags
    const articleWithTags = {
      ...formData,
      tags: selectedTags,
      lastModified: new Date().toISOString()
    };
    
    try {
      let updatedList: Article[];
      
      if (selectedArticle) {
        // Update existing article
        toast.loading("Updating article...");
        
        try {
          // Try to update on the server first
          await updateArticle(formData.id, articleWithTags);
        } catch (error) {
          console.warn('Server update failed, falling back to local update only');
        }
        
        // Update local list regardless of server success/failure
        updatedList = articleList.map(article => 
          article.id === formData.id ? articleWithTags : article
        );
        
        toast.success("Article updated successfully");
      } else {
        // Create new article
        toast.loading("Creating article...");
        
        const newArticle: Article = {
          ...articleWithTags,
          id: crypto.randomUUID(),
          comments: []
        };
        
        try {
          // Try to create on the server first
          await createArticle(newArticle);
        } catch (error) {
          console.warn('Server create failed, falling back to local create only');
        }
        
        // Add to local list regardless of server success/failure
        updatedList = [...articleList, newArticle];
        
        toast.success("Article created successfully");
        onNewArticle();
      }
      
      // Update the article list in the component state
      onArticleListUpdate(updatedList);
      
      // Save changes to local storage to ensure they're visible immediately
      await saveArticlesToStorage(updatedList);
      
      // Dispatch custom event for other components to know data has changed
      const event = new CustomEvent('articlesUpdated');
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error("Error saving article. Please try again.");
    }
  };

  // Handle article deletion
  const handleDelete = async () => {
    if (!selectedArticle) return;
    
    if (window.confirm(`Are you sure you want to delete "${selectedArticle.title}"?`)) {
      try {
        toast.loading("Deleting article...");
        
        try {
          // Try to delete on the server first
          await deleteArticle(selectedArticle.id);
        } catch (error) {
          console.warn('Server delete failed, falling back to local delete only');
        }
        
        // Update local state regardless of server success/failure
        const updatedList = articleList.filter(article => article.id !== selectedArticle.id);
        onArticleListUpdate(updatedList);
        await saveArticlesToStorage(updatedList);
        
        // Dispatch custom event for other components to know data has changed
        const event = new CustomEvent('articlesUpdated');
        window.dispatchEvent(event);
        
        onNewArticle();
        toast.success("Article deleted successfully");
      } catch (error) {
        console.error('Error deleting article:', error);
        toast.error("Error deleting article. Please try again.");
      }
    }
  };
  
  // Handle saving as draft
  const handleSaveAsDraft = async () => {
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
  
  // Handle schedule publication
  const handleSchedulePublication = async (publishDate: Date) => {
    // Validate form
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error("Content is required");
      return;
    }
    
    try {
      const scheduled = getScheduledFromStorage();
      let updatedScheduled: Article[];
      
      const scheduledArticle: Article = {
        ...formData,
        tags: selectedTags,
        scheduledDate: publishDate.toISOString(),
        status: 'scheduled' as const, // Use const assertion to ensure literal type
        lastModified: new Date().toISOString()
      };
      
      // Check if we're updating an existing scheduled article
      const existingIndex = scheduled.findIndex(item => item.id === formData.id);
      
      if (existingIndex >= 0) {
        // Update existing scheduled article
        updatedScheduled = scheduled.map((item, index) => 
          index === existingIndex ? scheduledArticle : item
        );
      } else {
        // Create new scheduled article
        const newScheduled: Article = {
          ...scheduledArticle,
          id: formData.id || crypto.randomUUID(),
          comments: []
        };
        
        updatedScheduled = [...scheduled, newScheduled];
      }
      
      await saveScheduledToStorage(updatedScheduled);
      toast.success(`Article scheduled for publication on ${publishDate.toLocaleDateString()}`);
      onNewArticle();
      
      // Dispatch custom event for other components to know data has changed
      const event = new CustomEvent('scheduledUpdated');
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error scheduling article:', error);
      toast.error("Error scheduling article. Please try again.");
    }
  };

  return {
    handleSubmit,
    handleDelete,
    handleSaveAsDraft,
    handleSchedulePublication
  };
};
