
import { useState, useEffect } from 'react';
import { Article } from '../../lib/types/article';
import { ArticleFormProps } from './types';
import { generateSlug, generateSlugFromTitle } from './utils/slugUtils';

/**
 * Default state for a new article form
 */
export const defaultFormState = (): Article => {
  // Get the current date and time with 12-hour format
  const now = new Date();
  const formattedDateTime = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  return {
    id: '',
    title: '',
    slug: '',
    author: '',
    date: formattedDateTime,
    category: 'Blog',
    image: '',
    excerpt: '',
    content: '',
    featured: false,
    comments: [],
    tags: []
  };
};

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
    
    return defaultFormState();
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
      setFormData(defaultFormState());
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
