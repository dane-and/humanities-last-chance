
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
    // Enhanced request logging
    const method = options.method || 'GET';
    const hasPayload = !!options.body;
    
    console.log(`API Request: ${method} ${url}`);
    if (hasPayload) {
      console.log(`Request payload: ${options.body}`);
    }
    
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
      let errorData = null;
      
      try {
        // Try to get detailed error message from response
        const textResponse = await response.text();
        console.log('Error response text:', textResponse);
        
        try {
          // Try to parse as JSON
          errorData = JSON.parse(textResponse);
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          // If JSON parsing fails, use text response as error message
          errorMessage = textResponse || errorMessage;
          console.error('Failed to parse error response as JSON:', parseError);
        }
      } catch (e) {
        // If reading text fails, use default error message
        console.error('Failed to read error response:', e);
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
  // Ensure endpoint doesn't have leading slash to avoid double slashes
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  const url = `${API_CONFIG.BASE_URL}/${normalizedEndpoint}`;
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
