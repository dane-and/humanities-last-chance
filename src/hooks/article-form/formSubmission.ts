
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

export const useArticleFormSubmission = (
  formData: Article,
  selectedTags: string[],
  { articleList, selectedArticle, onArticleListUpdate, onNewArticle }: ArticleFormProps
) => {
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
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
    
    let updatedList: Article[];
    
    if (selectedArticle) {
      // Update existing article
      updatedList = articleList.map(article => 
        article.id === formData.id ? { 
          ...formData, 
          tags: selectedTags,
          lastModified: new Date().toISOString() 
        } : article
      );
      toast.success("Article updated successfully");
    } else {
      // Create new article
      const newArticle: Article = {
        ...formData,
        id: crypto.randomUUID(),
        tags: selectedTags,
        comments: [],
        lastModified: new Date().toISOString()
      };
      
      updatedList = [...articleList, newArticle];
      toast.success("Article created successfully");
      onNewArticle();
    }
    
    onArticleListUpdate(updatedList);
    saveArticlesToStorage(updatedList);
  };

  // Handle article deletion
  const handleDelete = () => {
    if (!selectedArticle) return;
    
    if (window.confirm(`Are you sure you want to delete "${selectedArticle.title}"?`)) {
      const updatedList = articleList.filter(article => article.id !== selectedArticle.id);
      onArticleListUpdate(updatedList);
      saveArticlesToStorage(updatedList);
      onNewArticle();
      toast.success("Article deleted successfully");
    }
  };
  
  // Handle saving as draft
  const handleSaveAsDraft = () => {
    // Validate the minimum required fields
    if (!formData.title.trim()) {
      toast.error("Title is required even for drafts");
      return;
    }
    
    const drafts = getDraftsFromStorage();
    let updatedDrafts: Article[];
    
    // Check if we're updating an existing draft
    const existingDraftIndex = drafts.findIndex(draft => draft.id === formData.id);
    
    if (existingDraftIndex >= 0) {
      // Update existing draft
      updatedDrafts = drafts.map((draft, index) => 
        index === existingDraftIndex ? { 
          ...formData, 
          tags: selectedTags,
          isDraft: true,
          status: 'draft',
          lastModified: new Date().toISOString() 
        } : draft
      );
    } else {
      // Create new draft
      const newDraft: Article = {
        ...formData,
        id: formData.id || crypto.randomUUID(),
        tags: selectedTags,
        comments: [],
        isDraft: true,
        status: 'draft',
        lastModified: new Date().toISOString()
      };
      
      updatedDrafts = [...drafts, newDraft];
    }
    
    saveDraftsToStorage(updatedDrafts);
    toast.success("Draft saved successfully");
    onNewArticle();
  };
  
  // Handle schedule publication
  const handleSchedulePublication = (publishDate: Date) => {
    // Validate form
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error("Content is required");
      return;
    }
    
    const scheduled = getScheduledFromStorage();
    let updatedScheduled: Article[];
    
    // Check if we're updating an existing scheduled article
    const existingIndex = scheduled.findIndex(item => item.id === formData.id);
    
    if (existingIndex >= 0) {
      // Update existing scheduled article
      updatedScheduled = scheduled.map((item, index) => 
        index === existingIndex ? { 
          ...formData, 
          tags: selectedTags,
          scheduledDate: publishDate.toISOString(),
          status: 'scheduled',
          lastModified: new Date().toISOString() 
        } : item
      );
    } else {
      // Create new scheduled article
      const newScheduled: Article = {
        ...formData,
        id: formData.id || crypto.randomUUID(),
        tags: selectedTags,
        comments: [],
        scheduledDate: publishDate.toISOString(),
        status: 'scheduled',
        lastModified: new Date().toISOString()
      };
      
      updatedScheduled = [...scheduled, newScheduled];
    }
    
    saveScheduledToStorage(updatedScheduled);
    toast.success(`Article scheduled for publication on ${publishDate.toLocaleDateString()}`);
    onNewArticle();
  };

  return {
    handleSubmit,
    handleDelete,
    handleSaveAsDraft,
    handleSchedulePublication
  };
};
