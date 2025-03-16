
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
