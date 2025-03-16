
import { Article } from '../../../lib/types/article';

/**
 * Handlers for select/dropdown elements in the article form
 */
export const createSelectHandlers = (
  formData: Article,
  setFormData: (data: Article) => void
) => {
  // Handle select change - updated to directly work with the Select component
  const handleSelectChange = (name: string, value: string) => {
    // For category fields, ensure the value is one of the allowed types
    if (name === 'category') {
      setFormData({
        ...formData,
        category: value as Article['category'] // Cast to the correct type
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  return {
    handleSelectChange
  };
};
