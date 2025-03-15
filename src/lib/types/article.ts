
export interface Comment {
  id: string;
  articleId: string;
  name: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  author?: string;
  date: string;
  category: 'Blog' | 'Interview' | 'Review' | 'Resource';
  image: string;
  imageCaption?: string;
  excerpt: string;
  content: string;
  featured?: boolean;
  tags?: string[];
  comments?: Comment[];
}

// Empty array instead of sample articles
export const defaultArticles: Article[] = [];
