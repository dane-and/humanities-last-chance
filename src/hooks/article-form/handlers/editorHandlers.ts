
import { Article } from '../../../lib/types/article';

/**
 * Handlers for rich text editor in the article form
 */
export const createEditorHandlers = (
  formData: Article,
  setFormData: (data: Article) => void
) => {
  // Handle rich text editor change
  const handleEditorChange = (content: string) => {
    if (content === undefined || content === null) {
      content = '';
    }
    
    setFormData({
      ...formData,
      content
    });
  };

  return {
    handleEditorChange
  };
};
