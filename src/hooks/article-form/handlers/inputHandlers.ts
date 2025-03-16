
import { Article } from '../../../lib/types/article';
import { generateSlug } from '../utils/slugUtils';

/**
 * Handlers for basic input elements in the article form
 */
export const createInputHandlers = (
  formData: Article,
  setFormData: (data: Article) => void
) => {
  // Handle text input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // If changing title and there's no custom slug yet, auto-generate one
    if (name === 'title' && (!formData.slug || formData.slug === generateSlug(formData.title))) {
      setFormData({
        ...formData,
        title: value,
        slug: generateSlug(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  return {
    handleInputChange,
    handleCheckboxChange
  };
};
