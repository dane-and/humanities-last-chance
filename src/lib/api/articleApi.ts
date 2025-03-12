
import { Article, defaultArticles } from '../types/article';

const SHEET_ID = '1oXWfLDlqucIeqI0MKCWL2v3EcdLgha6YYDwYqa9FgX4';
const SHEET_NAME = 'Articles';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

/**
 * Fetches articles from Google Sheets
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
