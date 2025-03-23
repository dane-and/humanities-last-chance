
/**
 * Fetch All Posts
 * 
 * Fetches all blog posts from Sanity without filtering
 */

import { toast } from 'sonner';
import { sanityClient } from '../../client';
import { POST_PROJECTION, handleSanityError, logSamplePostData, mapSanityPostToArticle } from './utils';
import { Article } from '../../../types/article';

/**
 * Fetches all blog posts from Sanity without filtering
 */
export async function fetchBlogPosts(): Promise<Article[]> {
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
    
    // Map to our Article type with proper category normalization
    return posts ? posts.map(mapSanityPostToArticle) : [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    toast.error("Error loading posts from Sanity");
    return [];
  }
}
