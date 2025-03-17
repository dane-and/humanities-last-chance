
import { useState, useEffect, useCallback } from 'react';
import { useArticleFormHandlers, generateSlug } from './formHandlers';
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
    selectedArticle ? {...selectedArticle} : {...defaultFormState}
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    selectedArticle?.tags || []
  );
  const [isImageEditorOpen, setIsImageEditorOpen] = useState<boolean>(false);
  
  // Memoized set form data function to prevent unnecessary rerenders
  const setFormDataMemoized = useCallback((data: Article) => {
    setFormData(prevData => {
      // Skip update if nothing has changed
      if (JSON.stringify(prevData) === JSON.stringify(data)) {
        return prevData;
      }
      return data;
    });
  }, []);
  
  // Update form when selected article changes
  useEffect(() => {
    console.log('Selected article changed:', selectedArticle);
    if (selectedArticle) {
      // Create a fresh copy to avoid reference issues
      // Force all properties to be defined with defaults for any missing properties
      const articleCopy = {
        ...defaultFormState,
        ...selectedArticle,
        title: selectedArticle.title || '',
        slug: selectedArticle.slug || '',
        author: selectedArticle.author || '',
        category: selectedArticle.category || 'Blog',
        content: selectedArticle.content || ''
      };
      console.log('Setting form data to:', articleCopy);
      setFormData(articleCopy);
      setSelectedTags(selectedArticle.tags || []);
    } else {
      setFormData({...defaultFormState});
      setSelectedTags([]);
    }
  }, [selectedArticle]);

  // Get form handlers
  const handlers = useArticleFormHandlers(
    formData,
    setFormDataMemoized,
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
export { generateSlug };
