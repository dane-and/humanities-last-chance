
import { toast } from 'sonner';
import { Article } from '../../lib/types/article';
import { ArticleFormProps } from './types';

// Helper function to generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single one
    .trim();
};

export const useArticleFormHandlers = (
  formData: Article,
  setFormData: (data: Article) => void,
  selectedTags: string[],
  setSelectedTags: (tags: string[]) => void,
  setIsImageEditorOpen: (isOpen: boolean) => void,
  { articleList, selectedArticle, onArticleListUpdate, onNewArticle }: ArticleFormProps
) => {
  // Handle input change
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

  // Handle rich text editor change
  const handleEditorChange = (content: string) => {
    setFormData({
      ...formData,
      content
    });
  };

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

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  // Handle tags change
  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
    setFormData({
      ...formData,
      tags
    });
  };

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
    handleInputChange,
    handleEditorChange,
    handleSelectChange,
    handleCheckboxChange,
    handleTagsChange,
    handleImageChange,
    handleSaveEditedImage
  };
};
