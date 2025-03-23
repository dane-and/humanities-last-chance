
/**
 * Fetch Article By Slug
 * 
 * Fetches a specific article by its slug
 */

import { sanityClient } from '../../client';
import { toast } from 'sonner';
import { POST_PROJECTION } from './utils';

/**
 * Logs detailed category information for debugging
 */
const logArticleCategoryInfo = (post: any, slug: string) => {
  if (post) {
    console.log(`Category for article "${post.title}" (slug: ${slug}):`);
    console.log(`  Type: ${typeof post.category}`);
    console.log(`  Value:`, post.category);
    
    // More extensive debug info for complex objects
    if (post.category === null) {
      console.log(`  Category is null`);
    } else if (post.category === undefined) {
      console.log(`  Category is undefined`);
    } else if (typeof post.category === 'object' && post.category !== null) {
      console.log(`  Keys: ${Object.keys(post.category).join(', ')}`);
      console.log(`  JSON: ${JSON.stringify(post.category)}`);
      console.log(`  Safe extracted category: ${getSafeCategoryString(post.category)}`);
    }
  }
};

/**
 * Fetches a specific article by its slug
 */
export async function fetchArticleBySlug(slug: string) {
  try {
    console.log(`Fetching article with slug "${slug}" from Sanity...`);
    
    const post = await sanityClient.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        ${POST_PROJECTION},
        comments
      }
    `, { slug })
    .catch(error => {
      console.error(`Error in Sanity fetch for slug ${slug}:`, error);
      toast.error("Failed to connect to Sanity CMS");
      return null;
    });
    
    // Log category information for debugging
    logArticleCategoryInfo(post, slug);
    
    return post;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
}

// Need to import this after the function declaration to avoid circular dependencies
import { getSafeCategoryString } from '../../../utils/categoryUtils';
