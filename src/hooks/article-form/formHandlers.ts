
import { Article } from '../../lib/types/article';
import { ArticleFormProps } from './types';
import { createInputHandlers } from './handlers/inputHandlers';
import { createSelectHandlers } from './handlers/selectHandlers';
import { createEditorHandlers } from './handlers/editorHandlers';
import { createTagHandlers } from './handlers/tagHandlers';
import { createImageHandlers } from './handlers/imageHandlers';

export { generateSlug } from './utils/slugUtils';

export const useArticleFormHandlers = (
  formData: Article,
  setFormData: (data: Article) => void,
  selectedTags: string[],
  setSelectedTags: (tags: string[]) => void,
  setIsImageEditorOpen: (isOpen: boolean) => void,
  { articleList, selectedArticle, onArticleListUpdate, onNewArticle }: ArticleFormProps
) => {
  // Get input handlers
  const { handleInputChange, handleCheckboxChange } = createInputHandlers(formData, setFormData);
  
  // Get select handlers
  const { handleSelectChange } = createSelectHandlers(formData, setFormData);
  
  // Get editor handlers
  const { handleEditorChange } = createEditorHandlers(formData, setFormData);
  
  // Get tag handlers
  const { handleTagsChange } = createTagHandlers(formData, setFormData, setSelectedTags);
  
  // Get image handlers
  const { handleImageChange, handleSaveEditedImage } = createImageHandlers(formData, setFormData);

  return {
    handleInputChange,
    handleEditorChange,
    handleSelectChange,
    handleCheckboxChange,
    handleTagsChange,
    handleImageChange,
    handleSaveEditedImage
  };
};
