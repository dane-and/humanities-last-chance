
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
  author: string;
  date: string;
  category: 'Blog' | 'Interview' | 'Review' | 'Resource';
  image: string;
  excerpt: string;
  content: string;
  featured?: boolean;
  tags?: string[];
  comments?: Comment[];
}

// Empty sample articles to maintain structure
export const defaultArticles: Article[] = [
  {
    id: '1',
    title: 'Sample Blog Post',
    slug: 'sample-blog-post',
    author: '',
    date: '',
    category: 'Blog',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3',
    excerpt: '',
    content: '',
    featured: true,
    comments: [],
  },
  {
    id: '2',
    title: 'Sample Interview',
    slug: 'sample-interview',
    author: '',
    date: '',
    category: 'Interview',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3',
    excerpt: '',
    content: '',
    featured: true,
    comments: [],
  },
  {
    id: '3',
    title: 'Sample Review',
    slug: 'sample-review',
    author: '',
    date: '',
    category: 'Review',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3',
    excerpt: '',
    content: '',
    featured: false,
    comments: [],
  }
];
