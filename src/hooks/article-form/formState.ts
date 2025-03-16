
import { useState, useEffect } from 'react';
import { Article } from '../../lib/types/article';
import { ArticleFormProps, ArticleFormState } from './types';

// Default form state with properly typed category
export const defaultFormState: Article = {
  id: '',
  title: '',
  slug: '',
  author: '',
  date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  category: 'Blog', // This is now correctly typed as one of the allowed values
  image: '',
  imageCaption: '',
  excerpt: '',
  content: '',
  featured: false,
  tags: [],
  comments: []
};

export const useArticleFormState = (
  { selectedArticle }: Pick<ArticleFormProps, 'selectedArticle'>
): ArticleFormState => {
  // Form state
  const [formData, setFormData] = useState<Article>(defaultFormState);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);

  // Set form data when selected article changes
  useEffect(() => {
    if (selectedArticle) {
      setFormData(selectedArticle);
      setSelectedTags(selectedArticle.tags || []);
    } else {
      setFormData(defaultFormState);
      setSelectedTags([]);
    }
  }, [selectedArticle]);

  return {
    formData,
    selectedTags,
    isImageEditorOpen
  };
};
