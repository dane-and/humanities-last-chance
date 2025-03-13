
import { Article, defaultArticles } from '../types/article';

// Google Sheet configuration (kept for backward compatibility)
const SHEET_ID = '1oXWfLDlqucIeqI0MKCWL2v3EcdLgha6YYDwYqa9FgX4';
const SHEET_NAME = 'Articles';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

// API endpoint base URL - update this to your Hostinger domain when deployed
const API_BASE_URL = '/api';

/**
 * Fetches articles from the server API
 */
export const fetchArticlesFromApi = async (): Promise<Article[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles.php`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch articles');
    }
    
    const articles: Article[] = await response.json();
    return articles;
  } catch (error) {
    console.error('Error fetching articles from API:', error);
    
    // Fallback to sheets if API fails
    try {
      return await fetchArticlesFromSheet();
    } catch (sheetError) {
      console.error('Error fetching from fallback source:', sheetError);
      return defaultArticles;
    }
  }
};

/**
 * Creates a new article on the server
 */
export const createArticle = async (article: Omit<Article, 'id'>): Promise<Article> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles.php`, {
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
    const response = await fetch(`${API_BASE_URL}/articles.php/${id}`, {
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
    const response = await fetch(`${API_BASE_URL}/articles.php/${id}`, {
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
