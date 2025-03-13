
/**
 * Application configuration
 * 
 * Centralizes all environment-specific settings to simplify migration
 * between development, staging, and production environments.
 */

// API configuration
const API_CONFIG = {
  // Base URL for API endpoints
  // In production: always use relative URLs for same-domain API calls
  BASE_URL: '/api',
  
  // Timeout in milliseconds for API requests
  TIMEOUT: 30000,
  
  // Feature flags
  FEATURES: {
    USE_LOCAL_STORAGE_FALLBACK: true,
    USE_GOOGLE_SHEETS_FALLBACK: true,
  }
};

// Content configuration
const CONTENT_CONFIG = {
  // Default site metadata
  SITE_NAME: 'Humanities Last Chance',
  SITE_DESCRIPTION: 'Exploring and preserving the humanities in a digital age',
  
  // Social media links
  SOCIAL: {
    TWITTER: 'https://x.com/humanitieslc',
    // Add other social media links as needed
  }
};

// Google Sheets fallback configuration (for backup content source)
const SHEETS_CONFIG = {
  SHEET_ID: '1oXWfLDlqucIeqI0MKCWL2v3EcdLgha6YYDwYqa9FgX4',
  SHEET_NAME: 'Articles'
};

export { API_CONFIG, CONTENT_CONFIG, SHEETS_CONFIG };
