import { useEffect, useState } from 'react';

export interface Article {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  category: 'Blog' | 'Interview' | 'Review';
  image: string;
  excerpt: string;
  content: string;
  featured?: boolean;
  tags?: string[];
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
  }
];

const SHEET_ID = '1oXWfLDlqucIeqI0MKCWL2v3EcdLgha6YYDwYqa9FgX4';
const SHEET_NAME = 'Articles';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        
        const savedArticles = localStorage.getItem('admin-articles');
        if (savedArticles) {
          setArticles(JSON.parse(savedArticles));
          setError(null);
          setIsLoading(false);
          return;
        }
        
        try {
          const data = await fetchArticlesFromSheet();
          setArticles(data);
          setError(null);
        } catch (err) {
          console.error('Failed to fetch from Google Sheet, using defaults:', err);
          setArticles(defaultArticles);
          setError(new Error('Failed to fetch articles from external source.'));
        }
      } catch (err) {
        console.error('Error loading articles:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, []);

  return { articles, isLoading, error };
};

export const fetchArticlesFromSheet = async (): Promise<Article[]> => {
  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    
    const jsonStr = text.replace('/*O_o*/', '').replace(/google\.visualization\.Query\.setResponse\(|\);$/g, '');
    const data = JSON.parse(jsonStr);
    
    if (!data || !data.table || !data.table.rows) {
      console.error('Invalid data format from Google Sheets');
      return defaultArticles;
    }
    
    const cols = data.table.cols.map((col: any) => col.label);
    
    return data.table.rows.map((row: any, index: number) => {
      const values = row.c.map((cell: any) => (cell ? cell.v : ''));
      const article: any = {};
      
      cols.forEach((col: string, i: number) => {
        let key = col.toLowerCase().replace(/\s+/g, '');
        article[key] = values[i] || '';
      });
      
      article.id = article.id || String(index + 1);
      
      article.slug = article.slug || article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      if (!['Blog', 'Interview', 'Review'].includes(article.category)) {
        article.category = 'Blog';
      }
      
      return article as Article;
    });
  } catch (error) {
    console.error('Error fetching spreadsheet data:', error);
    return defaultArticles;
  }
};

const getArticlesFromStorage = (): Article[] => {
  try {
    const savedArticles = localStorage.getItem('admin-articles');
    return savedArticles ? JSON.parse(savedArticles) : defaultArticles;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultArticles;
  }
};

export const getFeaturedArticles = (articleList: Article[] = []) => {
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  return articles.filter(article => article.featured);
};

export const getLatestArticles = (count: number = 6, articleList: Article[] = []) => {
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  return [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getArticlesByCategory = (category: string, count?: number, articleList: Article[] = []) => {
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  const filtered = articles.filter(
    article => article.category.toLowerCase() === category.toLowerCase()
  );
  return count ? filtered.slice(0, count) : filtered;
};

export const getArticleBySlug = (slug: string, articleList: Article[] = []) => {
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  return articles.find(article => article.slug === slug);
};

export const articles = defaultArticles;

export const getArticlesByTag = (tag: string, count?: number, articleList: Article[] = []) => {
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  const filtered = articles.filter(
    article => article.tags && article.tags.includes(tag)
  );
  return count ? filtered.slice(0, count) : filtered;
};
