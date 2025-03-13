
/**
 * Application configuration
 * 
 * Centralizes all environment-specific settings to simplify migration
 * between development, staging, and production environments.
 */

// Determine current environment
const isVercel = import.meta.env.VITE_HOSTING === 'vercel';
const isDevelopment = import.meta.env.DEV;

// API configuration
const API_CONFIG = {
  // Base URL for API endpoints
  // In production: use environment variable or fall back to relative URL for self-hosted API
  BASE_URL: isVercel 
    ? import.meta.env.VITE_API_URL || 'https://api.humanitieslast.com' 
    : '/api',
  
  // Timeout in milliseconds for API requests
  TIMEOUT: 30000,
  
  // Feature flags
  FEATURES: {
    // Enable localStorage fallback for situations when API is unavailable
    USE_LOCAL_STORAGE_FALLBACK: true,
    // Enable Google Sheets fallback (configured below)
    USE_GOOGLE_SHEETS_FALLBACK: isVercel,
    // Disable API calls for pure static hosting
    STATIC_ONLY: isVercel && !import.meta.env.VITE_API_URL,
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
  SHEET_ID: import.meta.env.VITE_GOOGLE_SHEET_ID || '1oXWfLDlqucIeqI0MKCWL2v3EcdLgha6YYDwYqa9FgX4',
  SHEET_NAME: 'Articles'
};

// CMS configuration for Vercel deployment
const CMS_CONFIG = {
  TYPE: import.meta.env.VITE_CMS_TYPE || 'local-storage', // Options: 'local-storage', 'google-sheets', 'contentful', 'sanity', 'strapi'
  // Contentful configuration
  CONTENTFUL: {
    SPACE_ID: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    ACCESS_TOKEN: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  },
  // Sanity configuration
  SANITY: {
    PROJECT_ID: import.meta.env.VITE_SANITY_PROJECT_ID,
    DATASET: import.meta.env.VITE_SANITY_DATASET || 'production',
  },
};

export { API_CONFIG, CONTENT_CONFIG, SHEETS_CONFIG, CMS_CONFIG };
