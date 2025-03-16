
import { Article } from '../../lib/types/article';

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
