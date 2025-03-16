
import { toast } from 'sonner';
import { Article } from '../../../lib/types/article';
import { saveArticlesToStorage } from '../../../lib/utils/storage/articleStorage';
import { deleteArticle } from '../../../lib/api/article/crudOperations';

/**
 * Handle article deletion
 */
export const handleArticleDelete = async (
  selectedArticle: Article | null,
  articleList: Article[],
  onArticleListUpdate: (articles: Article[]) => void,
  onNewArticle: () => void
): Promise<void> => {
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
