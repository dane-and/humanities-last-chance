
import { useState, useEffect } from 'react';
import { useArticleFormHandlers } from './formHandlers';
import { useArticleFormSubmission } from './formSubmission';
import { ArticleFormProps } from './types';
import { Article } from '../../lib/types/article';
import { defaultFormState } from './formState';

export const useArticleForm = (
  articleList: ArticleFormProps['articleList'],
  selectedArticle: ArticleFormProps['selectedArticle'],
  onArticleListUpdate: ArticleFormProps['onArticleListUpdate'],
  onNewArticle: ArticleFormProps['onNewArticle']
) => {
  const props: ArticleFormProps = {
    articleList,
    selectedArticle,
    onArticleListUpdate,
    onNewArticle
  };

  // Initialize form data
  const [formData, setFormData] = useState<Article>(
    selectedArticle ? selectedArticle : defaultFormState
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    selectedArticle?.tags || []
  );
  const [isImageEditorOpen, setIsImageEditorOpen] = useState<boolean>(false);
  
  // Update form when selected article changes
  useEffect(() => {
    if (selectedArticle) {
      setFormData(selectedArticle);
      setSelectedTags(selectedArticle.tags || []);
    } else {
      setFormData(defaultFormState);
      setSelectedTags([]);
    }
  }, [selectedArticle]);

  // Get form handlers
  const handlers = useArticleFormHandlers(
    formData,
    setFormData,
    selectedTags,
    setSelectedTags,
    setIsImageEditorOpen,
    props
  );

  // Get form submission handlers
  const submission = useArticleFormSubmission(formData, selectedTags, props);

  return {
    formData,
    selectedTags,
    isImageEditorOpen,
    setIsImageEditorOpen,
    ...handlers,
    ...submission
  };
};

export * from './types';
