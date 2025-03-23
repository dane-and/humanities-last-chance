
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { CMS_CONFIG } from '../config';
import { toast } from 'sonner';

// Get Sanity configuration from environment variables or fallback to config
const projectId = CMS_CONFIG.SANITY.PROJECT_ID || 'nzyg33ca';
const dataset = CMS_CONFIG.SANITY.DATASET || 'production';
const apiVersion = '2023-05-03';

// Configuration object for debugging
const sanityConfig = {
  projectId,
  dataset,
  useCdn: true,
  apiVersion,
  // Add these settings for better network resilience
  perspective: 'published' as const, // Explicitly typed as const to match ClientPerspective
  timeout: 60000, // Increased timeout (60 seconds)
  // Add retry configuration
  maxRetries: 3,
  retryDelay: 1000 // Start with 1s delay, increases exponentially
};

// Log configuration for debugging
console.log('Initializing Sanity client with config:', {
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn
});

// Create and export the Sanity client
export const sanityClient = createClient(sanityConfig);

// Add a connection test function
export async function testSanityConnection() {
  try {
    console.log('Testing Sanity connection...');
    // Try a simple query to see if the connection works
    const result = await sanityClient.fetch(`*[_type == "post"][0...1]`);
    console.log('Sanity connection test result:', result);
    return true;
  } catch (error) {
    console.error('Failed to connect to Sanity:', error);
    toast.error('Failed to connect to Sanity CMS. Please check your project ID and network connection.');
    return false;
  }
}

// Set up image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
