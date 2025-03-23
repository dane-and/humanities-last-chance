
/**
 * Fetch All Posts
 * 
 * Fetches all blog posts from Sanity without filtering
 */

import { toast } from 'sonner';
import { sanityClient } from '../../client';
import { POST_PROJECTION, handleSanityError, logSamplePostData } from './utils';

/**
 * Fetches all blog posts from Sanity without filtering
 */
export async function fetchBlogPosts() {
  try {
    console.log("Fetching all blog posts from Sanity...");
    
    // Simple query to get all posts without filtering
    const posts = await sanityClient.fetch(`
      *[_type == "post"] {
        ${POST_PROJECTION},
        comments
      }
    `)
    .catch(error => handleSanityError(error, "Error in Sanity fetch:"));
    
    console.log("Fetched posts from Sanity:", posts?.length || 0);
    
    // Log sample data for debugging
    logSamplePostData(posts);
    
    return posts || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    toast.error("Error loading posts from Sanity");
    return [];
  }
}
