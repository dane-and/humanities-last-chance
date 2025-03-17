
import { API_CONFIG, SHEETS_CONFIG } from '../config';

// Simple rate limiter to prevent too many API calls in short succession
const pendingRequests = new Map<string, Promise<any>>();
const requestCooldowns = new Map<string, number>();
const MIN_REQUEST_INTERVAL = 500; // ms between identical requests

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
  
  // Generate a cache key based on URL and method
  const cacheKey = `${options.method || 'GET'}-${url}`;
  
  // Check if this exact request is already in progress
  if (pendingRequests.has(cacheKey)) {
    console.log(`Request to ${url} already in progress, reusing promise`);
    return pendingRequests.get(cacheKey) as Promise<Response>;
  }
  
  // Check if we need to throttle identical requests
  const lastRequestTime = requestCooldowns.get(cacheKey) || 0;
  const timeSinceLastRequest = Date.now() - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const delay = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    console.log(`Rate limiting request to ${url}, delaying by ${delay}ms`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  try {
    // Enhanced request logging with full details
    const method = options.method || 'GET';
    const hasPayload = !!options.body;
    
    console.log(`API Request: ${method} ${url}`);
    if (hasPayload) {
      console.log(`Request payload: ${options.body}`);
    }
    
    // Add some basic request headers if not already set
    const enhancedOptions = { ...options };
    if (!enhancedOptions.headers) {
      enhancedOptions.headers = {};
    }
    
    // Add some useful headers for debugging and cors
    if (method === 'PUT' || method === 'POST') {
      if (!enhancedOptions.headers['Content-Type']) {
        enhancedOptions.headers['Content-Type'] = 'application/json';
      }
    }
    
    // Create the request promise with detailed logging
    const requestPromise = (async () => {
      try {
        const start = Date.now();
        console.log(`Sending ${method} request to ${url} at ${new Date().toISOString()}`);
        
        const response = await fetch(url, {
          ...enhancedOptions,
          signal: controller.signal
        });
        
        const responseTime = Date.now() - start;
        console.log(`API Response received: ${response.status} (${responseTime}ms)`);
        
        // Log response headers for debugging
        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        console.log('Response headers:', responseHeaders);
        
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
              console.error('API Error response (parsed):', errorData);
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
      } finally {
        // Remove from pending requests when done
        pendingRequests.delete(cacheKey);
        // Update the cooldown time
        requestCooldowns.set(cacheKey, Date.now());
      }
    })();
    
    // Store the request promise
    pendingRequests.set(cacheKey, requestPromise);
    
    const response = await requestPromise;
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    pendingRequests.delete(cacheKey);
    
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
  
  // Use the base URL from configuration
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
