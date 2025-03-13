
import { Article, defaultArticles } from '../types/article';
import { API_CONFIG, SHEETS_CONFIG } from '../config';

// Google Sheet URL builder
const getSheetURL = () => {
  const { SHEET_ID, SHEET_NAME } = SHEETS_CONFIG;
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
};

/**
 * Fetches articles from all available sources in parallel
 * Returns the first successful result
 */
export const fetchArticles = async (): Promise<Article[]> => {
  // Create promises for all data sources
  const apiPromise = fetchArticlesFromApi().catch(err => {
    console.warn('API fetch failed:', err);
    return null;
  });
  
  const sheetPromise = API_CONFIG.FEATURES.USE_GOOGLE_SHEETS_FALLBACK ? 
    fetchArticlesFromSheet().catch(err => {
      console.warn('Sheet fetch failed:', err);
      return null;
    }) : Promise.resolve(null);
  
  // Wait for all promises to settle
  const results = await Promise.allSettled([apiPromise, sheetPromise]);
  
  // Find the first successful result
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value && result.value.length > 0) {
      return result.value;
    }
  }
  
  // If all sources failed, return default articles
  console.warn('All article sources failed, using defaults');
  return defaultArticles;
};

/**
 * Fetches articles from the server API
 */
export const fetchArticlesFromApi = async (): Promise<Article[]> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
  
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/articles.php`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch articles');
    }
    
    const articles: Article[] = await response.json();
    return articles;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timeout: API server is not responding');
    }
    throw error;
  }
};

/**
 * Creates a new article on the server
 */
export const createArticle = async (article: Omit<Article, 'id'>): Promise<Article> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/articles.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create article');
    }
    
    const data = await response.json();
    return data.article;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

/**
 * Updates an existing article on the server
 */
export const updateArticle = async (id: string, article: Partial<Article>): Promise<Article> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/articles.php/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update article');
    }
    
    const data = await response.json();
    return data.article;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

/**
 * Deletes an article from the server
 */
export const deleteArticle = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/articles.php/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete article');
    }
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};

/**
 * Fetches articles from Google Sheets (legacy fallback method)
 */
export const fetchArticlesFromSheet = async (): Promise<Article[]> => {
  try {
    const response = await fetch(getSheetURL());
    const text = await response.text();
    
    const jsonStr = text.replace('/*O_o*/', '').replace(/google\.visualization\.Query\.setResponse\(|\);$/g, '');
    const data = JSON.parse(jsonStr);
    
    if (!data || !data.table || !data.table.rows) {
      console.error('Invalid data format from Google Sheets');
      return [];
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
    throw error;
  }
};
