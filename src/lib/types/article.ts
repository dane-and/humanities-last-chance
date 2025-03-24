
export interface Comment {
  id: string;
  articleId: string;
  name: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
}

export interface ArticleAnalytics {
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  lastUpdated: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  author?: string;
  date: string;
  category: 'Blog' | 'Interview' | 'Review' | 'Resource';
  image: string; // We'll keep this as string but handle empty strings as "no image"
  imageCaption?: string;
  excerpt: string;
  content: string;
  featured?: boolean;
  tags?: string[];
  comments?: Comment[];
  isDraft?: boolean;
  scheduledDate?: string;
  analytics?: ArticleAnalytics;
  lastModified?: string;
  status?: 'published' | 'draft' | 'scheduled';
  mediaAttachments?: string[];
  publishedAt?: string; // Add this field for storing the original publication date
}

// Replace default articles with empty array
export const defaultArticles: Article[] = [];
