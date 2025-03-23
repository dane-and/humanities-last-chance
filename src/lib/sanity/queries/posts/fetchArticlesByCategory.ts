
/**
 * Fetch Articles By Category
 * 
 * Fetches articles filtered by category
 */

import { sanityClient } from '../../client';
import { POST_PROJECTION, handleSanityError } from './utils';
import { isCategoryMatch, getSafeCategoryString } from '../../../utils/categoryUtils';

/**
 * Logs debug information about available categories
 */
const logCategoryDebugInfo = (posts: any[]) => {
  if (posts && posts.length > 0) {
    // Log all categories for debugging
    const allCategories = [...new Set(posts.map((post: any) => {
      const cat = post.category;
      if (typeof cat === 'string') return cat;
      if (Array.isArray(cat) && cat.length > 0) return `Array: ${cat[0]}`;
      if (cat && typeof cat === 'object') return `Object: ${JSON.stringify(cat)}`;
      return 'undefined or null';
    }))];
    
    console.log("Available categories in posts:", allCategories);
  }
};

/**
 * Filters posts by a specific category, handling variations
 */
const filterPostsByCategory = (posts: any[], category: string) => {
  if (!posts || posts.length === 0) {
    return [];
  }
  
  // Filter posts by category using our utility function
  const filteredPosts = posts.filter((post: any) => {
    if (!post.category) return false;
    return isCategoryMatch(post.category, category);
  });
  
  console.log(`Found ${filteredPosts.length} posts with category "${category}" (including singular/plural variations)`);
  
  // Log the titles of filtered posts for debugging
  if (filteredPosts.length > 0) {
    console.log("Filtered posts:", filteredPosts.map((p: any) => ({ 
      title: p.title, 
      categoryType: typeof p.category,
      categoryValue: p.category,
      safeCategoryStr: getSafeCategoryString(p.category)
    })));
  }
  
  return filteredPosts;
};

/**
 * Fetches articles filtered by category
 */
export async function fetchArticlesByCategory(category: string) {
  try {
    console.log(`Fetching articles with category "${category}" from Sanity...`);
    
    // First get ALL posts - simplified query to reduce complexity
    const posts = await sanityClient.fetch(`
      *[_type == "post"] {
        ${POST_PROJECTION}
      }
    `)
    .catch(error => handleSanityError(error, `Error in Sanity fetch for category ${category}:`));
    
    // Log all retrieved posts for debugging
    console.log(`Retrieved ${posts?.length || 0} total posts from Sanity`);
    logCategoryDebugInfo(posts);
    
    // Filter posts by category using our utility function
    const filteredPosts = filterPostsByCategory(posts, category);
    
    return filteredPosts || [];
  } catch (error) {
    console.error(`Error fetching articles by category:`, error);
    return [];
  }
}
