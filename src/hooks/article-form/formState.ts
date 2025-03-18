
import { useState, useEffect } from 'react';
import { Article } from '../../lib/types/article';
import { ArticleFormProps } from './types';
import { generateSlugFromTitle } from './utils/slugUtils';

/**
 * Custom hook for managing article form state
 */
export const useArticleFormState = ({
  selectedArticle,
}: Pick<ArticleFormProps, 'selectedArticle'>) => {
  // Initialize form data from selected article or with defaults
  const initializeFormData = (): Article => {
    if (selectedArticle) {
      console.log('Initializing form with selected article:', selectedArticle);
      return { ...selectedArticle };
    }
    
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return {
      id: '',
      title: '',
      slug: '',
      author: '',
      date: today,
      category: 'Blog',
      image: '',
      excerpt: '',
      content: '',
      featured: false,
      comments: [],
      tags: []
    };
  };
  
  const [formData, setFormData] = useState<Article>(initializeFormData());
  const [selectedTags, setSelectedTags] = useState<string[]>(selectedArticle?.tags || []);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
  
  // Update form when selected article changes
  useEffect(() => {
    if (selectedArticle) {
      setFormData({ ...selectedArticle });
      setSelectedTags(selectedArticle.tags || []);
    } else {
      // Reset form when no article is selected
      setFormData(initializeFormData());
      setSelectedTags([]);
    }
  }, [selectedArticle]);

  return {
    formData,
    setFormData,
    selectedTags,
    setSelectedTags,
    isImageEditorOpen,
    setIsImageEditorOpen
  };
};
