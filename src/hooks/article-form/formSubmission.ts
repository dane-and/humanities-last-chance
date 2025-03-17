
import { Article } from '../../lib/types/article';
import { ArticleFormProps } from './types';
import { handleArticleCreateOrUpdate } from './operations/createUpdateOperations';
import { handleArticleDelete } from './operations/deleteOperations';
import { handleSaveAsDraft, handlePublishDraft } from './operations/draftOperations';
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
  
  // Handle saving as draft - explicitly triggered by button click only
  const handleSaveAsDraft = async () => {
    await handleSaveAsDraft(formData, selectedTags, onNewArticle);
  };
  
  // Handle publishing draft article
  const handlePublishDraft = async () => {
    await handlePublishDraft(formData, selectedTags, onNewArticle);
  };
  
  // Handle schedule publication
  const handleSchedulePublication = async (publishDate: Date) => {
    await schedulePublication(formData, selectedTags, publishDate, onNewArticle);
  };

  return {
    handleSubmit,
    handleDelete,
    handleSaveAsDraft,
    handleSchedulePublication,
    handlePublishDraft
  };
};
