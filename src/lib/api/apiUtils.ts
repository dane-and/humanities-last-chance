
import { API_CONFIG, SHEETS_CONFIG } from '../config';

/**
 * Creates a fetch request with timeout functionality
 */
export const fetchWithTimeout = async (
  url: string, 
  options: RequestInit = {}, 
  timeout: number = API_CONFIG.TIMEOUT
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    console.log(`API Request: ${options.method || 'GET'} ${url}`, 
      options.body ? 'with payload' : 'without payload');
    
    const start = Date.now();
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    const responseTime = Date.now() - start;
    console.log(`API Response: ${response.status} (${responseTime}ms)`);
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use default error message
      }
      console.error('API Error:', errorMessage);
      throw new Error(errorMessage);
    }
    
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('API Timeout: Request exceeded timeout limit');
      throw new Error('Request timeout: API server is not responding');
    }
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Builds the API endpoint URL
 */
export const getApiUrl = (endpoint: string): string => {
  const url = `${API_CONFIG.BASE_URL}/${endpoint}`;
  console.log('Generated API URL:', url);
  return url;
};

/**
 * Google Sheet URL builder
 */
export const getSheetURL = () => {
  const { SHEET_ID, SHEET_NAME } = SHEETS_CONFIG;
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
};
