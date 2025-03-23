
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { CMS_CONFIG } from '../config';

// Get Sanity configuration from environment variables or fallback to config
const projectId = CMS_CONFIG.SANITY.PROJECT_ID || 'nzyg33ca';
const dataset = CMS_CONFIG.SANITY.DATASET || 'production';
const apiVersion = '2023-05-03';

// Configuration object for debugging
const sanityConfig = {
  projectId,
  dataset,
  useCdn: true,
  apiVersion
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

// Set up image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
