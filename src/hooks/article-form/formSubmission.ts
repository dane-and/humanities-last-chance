
import { toast } from 'sonner';
import { Article } from '../../lib/types/article';
import { ArticleFormProps } from './types';
import { saveArticlesToStorage } from '../../lib/utils/storage/articleStorage';

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
        article.id === formData.id ? { ...formData, tags: selectedTags } : article
      );
      toast.success("Article updated successfully");
    } else {
      // Create new article
      const newArticle: Article = {
        ...formData,
        id: crypto.randomUUID(),
        tags: selectedTags,
        comments: []
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

  return {
    handleSubmit,
    handleDelete
  };
};
