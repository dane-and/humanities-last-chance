
import { useState } from 'react';
import { useArticleFormState } from './formState';
import { useArticleFormHandlers } from './formHandlers';
import { useArticleFormSubmission } from './formSubmission';
import { ArticleFormProps } from './types';
import { Article } from '../../lib/types/article';

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

  // Use state hooks
  const { formData: initialFormData, selectedTags: initialTags, isImageEditorOpen: initialEditorState } = 
    useArticleFormState({ selectedArticle });
  
  // Create state hooks here to avoid the circular dependency issue
  const [formData, setFormData] = useState<Article>(initialFormData);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState<boolean>(initialEditorState);

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
