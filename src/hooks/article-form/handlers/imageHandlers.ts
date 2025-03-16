
import { Article } from '../../../lib/types/article';

/**
 * Handlers for image-related functionality in the article form
 */
export const createImageHandlers = (
  formData: Article,
  setFormData: (data: Article) => void
) => {
  // Handle image change
  const handleImageChange = (url: string) => {
    setFormData({
      ...formData,
      image: url
    });
  };
  
  // Handle save edited image
  const handleSaveEditedImage = (editedImage: string) => {
    setFormData({
      ...formData,
      image: editedImage
    });
  };

  return {
    handleImageChange,
    handleSaveEditedImage
  };
};
