
import { Article } from '../../lib/types/article';
import { ArticleFormProps } from './types';
import { handleArticleCreateOrUpdate } from './operations/createUpdateOperations';
import { handleArticleDelete } from './operations/deleteOperations';
import { handleSaveAsDraft as saveAsDraft } from './operations/draftOperations';
import { handleSchedulePublication as schedulePublication } from './operations/scheduledOperations';

/**
 * Hook for handling form submission actions in the article form
 */
export const useArticleFormSubmission = (
  formData: Article,
  selectedTags: string[],
  { articleList, selectedArticle, onArticleListUpdate, onNewArticle }: ArticleFormProps
) => {
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleArticleCreateOrUpdate(
      formData,
      selectedTags,
      selectedArticle,
      articleList,
      onArticleListUpdate,
      onNewArticle
    );
  };

  // Handle article deletion
  const handleDelete = async () => {
    await handleArticleDelete(
      selectedArticle,
      articleList,
      onArticleListUpdate,
      onNewArticle
    );
  };
  
  // Handle saving as draft
  const handleSaveAsDraft = async () => {
    await saveAsDraft(formData, selectedTags, onNewArticle);
  };
  
  // Handle schedule publication
  const handleSchedulePublication = async (publishDate: Date) => {
    await schedulePublication(formData, selectedTags, publishDate, onNewArticle);
  };

  return {
    handleSubmit,
    handleDelete,
    handleSaveAsDraft,
    handleSchedulePublication
  };
};
