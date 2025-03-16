
import { Article } from '../../../lib/types/article';

/**
 * Handlers for tags in the article form
 */
export const createTagHandlers = (
  formData: Article,
  setFormData: (data: Article) => void,
  setSelectedTags: (tags: string[]) => void
) => {
  // Handle tags change
  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
    setFormData({
      ...formData,
      tags
    });
  };

  return {
    handleTagsChange
  };
};
