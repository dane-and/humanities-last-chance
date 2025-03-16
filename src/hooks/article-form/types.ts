
import { Article } from '../../lib/types/article';

export interface ArticleFormProps {
  articleList: Article[];
  selectedArticle: Article | null;
  onArticleListUpdate: (updatedList: Article[]) => void;
  onNewArticle: () => void;
}

export interface ArticleFormState {
  formData: Article;
  selectedTags: string[];
  isImageEditorOpen: boolean;
}

export interface ArticleFormActions {
  setFormData: (data: Article) => void;
  setSelectedTags: (tags: string[]) => void;
  setIsImageEditorOpen: (isOpen: boolean) => void;
}
