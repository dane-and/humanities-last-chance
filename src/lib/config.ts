
/**
 * Application configuration
 * 
 * Centralizes all environment-specific settings to simplify migration
 * between development, staging, and production environments.
 */

// Determine current environment
const isNetlify = import.meta.env.VITE_HOSTING === 'netlify';
const isVercel = import.meta.env.VITE_HOSTING === 'vercel';
const isGitHubPages = import.meta.env.VITE_HOSTING === 'github';
const isDevelopment = import.meta.env.DEV;

// Base path for assets (important for GitHub Pages deployment)
const BASE_PATH = import.meta.env.VITE_BASE_URL || '/';

// API configuration
const API_CONFIG = {
  // Base URL for API endpoints
  // In production: use environment variable or fall back to relative URL for self-hosted API
  BASE_URL: (isVercel || isNetlify)
    ? import.meta.env.VITE_API_URL || 'https://api.humanitieslastchance.org' 
    : '/api',
  
  // Timeout in milliseconds for API requests
  TIMEOUT: 30000,
  
  // Feature flags
  FEATURES: {
    // Enable localStorage fallback for situations when API is unavailable
    USE_LOCAL_STORAGE_FALLBACK: true,
    // Enable Google Sheets fallback (configured below)
    USE_GOOGLE_SHEETS_FALLBACK: (isVercel || isNetlify),
    // Disable API calls for pure static hosting
    STATIC_ONLY: (isVercel || isNetlify || isGitHubPages) && !import.meta.env.VITE_API_URL,
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

// Authentication configuration
const AUTH_CONFIG = {
  // Admin credentials - for hosted environments, use environment variables
  ADMIN_USERNAME: (isVercel || isNetlify)
    ? import.meta.env.VITE_ADMIN_USERNAME || 'daneanderson10'
    : 'daneanderson10',
  ADMIN_PASSWORD: (isVercel || isNetlify)
    ? import.meta.env.VITE_ADMIN_PASSWORD || 'uR5!9xB#k2Pz@Lm$'
    : 'uR5!9xB#k2Pz@Lm$',
  // Add other auth settings as needed
};

export { API_CONFIG, CONTENT_CONFIG, SHEETS_CONFIG, CMS_CONFIG, AUTH_CONFIG, BASE_PATH };
