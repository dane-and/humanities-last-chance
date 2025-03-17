
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
    // Skip if the content is exactly the same (prevents infinite loops)
    if (formData.content === content) {
      return;
    }
    
    // Ensure content is never undefined or null
    const safeContent = content || '';
    
    console.log('Editor content changed, length:', safeContent.length);
    
    // Create a new formData object to ensure reactivity
    setFormData({
      ...formData,
      content: safeContent
    });
  };

  return {
    handleEditorChange
  };
};
