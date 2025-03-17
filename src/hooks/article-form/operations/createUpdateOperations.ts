
import { toast } from 'sonner';
import { Article } from '../../../lib/types/article';
import { saveArticlesToStorage } from '../../../lib/utils/storage/articleStorage';
import { createArticle, updateArticle } from '../../../lib/api/article/crudOperations';

/**
 * Handle article creation or update
 */
export const handleArticleCreateOrUpdate = async (
  formData: Article,
  selectedTags: string[],
  selectedArticle: Article | null,
  articleList: Article[],
  onArticleListUpdate: (articles: Article[]) => void,
  onNewArticle: () => void
): Promise<void> => {
  // Validate form
  if (!formData.title?.trim()) {
    toast.error("Title is required");
    return;
  }
  
  if (!formData.content?.trim()) {
    toast.error("Content is required");
    return;
  }
  
  // Make a deep copy of the formData to avoid reference issues
  const articleToSave = JSON.parse(JSON.stringify(formData));
  
  // Prepare updated article with selected tags
  const articleWithTags = {
    ...articleToSave,
    tags: selectedTags,
    lastModified: new Date().toISOString()
  };
  
  console.log('Saving article:', articleWithTags);
  
  try {
    let updatedList: Article[];
    const toastId = toast.loading(selectedArticle ? "Updating article..." : "Creating article...");
    
    try {
      if (selectedArticle) {
        // Update existing article
        // Ensure the ID is set correctly
        if (!articleWithTags.id) {
          articleWithTags.id = selectedArticle.id;
        }
        
        console.log('Updating article with ID:', articleWithTags.id);
        
        // Try to update on the server first
        const result = await updateArticle(articleWithTags.id, articleWithTags);
        console.log('Update result:', result);
        
        // Update local list
        updatedList = articleList.map(article => 
          article.id === articleWithTags.id ? articleWithTags : article
        );
        
        toast.success("Article updated successfully", {
          id: toastId
        });
      } else {
        // Create new article
        const newArticle: Article = {
          ...articleWithTags,
          id: crypto.randomUUID(),
          comments: []
        };
        
        // Try to create on the server first
        await createArticle(newArticle);
        
        // Add to local list
        updatedList = [...articleList, newArticle];
        
        toast.success("Article created successfully", {
          id: toastId
        });
        onNewArticle();
      }
      
      // Update the article list in the component state
      onArticleListUpdate(updatedList);
      
      // Save changes to local storage to ensure they're visible immediately
      await saveArticlesToStorage(updatedList);
      
      // Dispatch custom event for other components to know data has changed
      window.dispatchEvent(new CustomEvent('articlesUpdated'));
    } catch (serverError) {
      console.error('Server operation failed, details:', serverError);
      
      if (selectedArticle) {
        // Local update fallback for existing article
        updatedList = articleList.map(article => 
          article.id === articleWithTags.id ? articleWithTags : article
        );
        
        toast.error("Server update failed. Changes saved locally only.", {
          id: toastId,
          duration: 4000
        });
      } else {
        // Local creation fallback for new article
        const newArticle: Article = {
          ...articleWithTags,
          id: crypto.randomUUID(),
          comments: []
        };
        
        updatedList = [...articleList, newArticle];
        
        toast.error("Server create failed. Article saved locally only.", {
          id: toastId,
          duration: 4000
        });
        onNewArticle();
      }
      
      // Still update locally
      onArticleListUpdate(updatedList);
      await saveArticlesToStorage(updatedList);
      window.dispatchEvent(new CustomEvent('articlesUpdated'));
    }
  } catch (error) {
    console.error('Error saving article:', error);
    toast.error("Error saving article. Please try again.");
  }
};
