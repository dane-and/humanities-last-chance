
import { Article, defaultArticles } from '../../types/article';
import { fetchWithTimeout, getApiUrl, getSheetURL } from '../apiUtils';
import { API_CONFIG } from '../../config';

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
  try {
    const response = await fetchWithTimeout(getApiUrl('articles.php'));
    const articles: Article[] = await response.json();
    return articles;
  } catch (error) {
    console.error('Error fetching articles from API:', error);
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
