
/**
 * Post Query Utilities
 * 
 * Shared utilities and constants for post queries
 */

import { toast } from 'sonner';
import { Article } from '../../../types/article';
import { getSafeCategoryString, getNormalizedCategory } from '../../../utils/categoryUtils';

/**
 * Base post query fields to reuse across different queries
 */
export const POST_PROJECTION = `
  _id,
  title,
  slug,
  mainImage{
    asset->{
      _id,
      url
    },
    caption
  },
  body,
  publishedAt,
  _createdAt,
  _updatedAt,
  category,
  tags,
  excerpt
`;

/**
 * Common error handler for Sanity query failures
 */
export const handleSanityError = (error: any, message: string) => {
  console.error(message, error);
  toast.error("Failed to connect to Sanity CMS");
  return [];
};

/**
 * Maps a Sanity post to our Article interface
 */
export const mapSanityPostToArticle = (post: any): Article => {
  // Extract category safely using utility function
  const categoryString = getSafeCategoryString(post.category);
  console.log(`Mapping post "${post.title}" with extracted category: "${categoryString}"`);
  
  // Get normalized category to ensure it matches our Article type
  const normalizedCategory = getNormalizedCategory(post.category);
  
  // Always use the original publishedAt date from Sanity
  const publishedDate = post.publishedAt 
    ? new Date(post.publishedAt) 
    : (post._createdAt ? new Date(post._createdAt) : new Date());
  
  return {
    id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: post.title || "Untitled Post",
    slug: post.slug?.current || `post-${Date.now()}`,
    date: publishedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    publishedAt: post.publishedAt || post._createdAt || new Date().toISOString(),
    category: normalizedCategory, // This ensures we have a valid category type
    image: post.mainImage?.asset?.url || '',
    imageCaption: post.mainImage?.caption || '',
    excerpt: post.excerpt || '',
    content: post.body || '',
    featured: false,
    tags: post.tags || [],
    comments: post.comments || [],
  };
};

/**
 * Logs sample post data for debugging purposes
 */
export const logSamplePostData = (posts: any[]) => {
  if (posts && posts.length > 0) {
    console.log("Sample post data:", posts[0]);
    
    // Log all categories for debugging
    const categories = [...new Set(posts.map((post: any) => {
      const cat = post.category;
      if (typeof cat === 'string') return cat;
      if (Array.isArray(cat) && cat.length > 0) return `Array: ${cat[0]}`;
      if (cat && typeof cat === 'object') return `Object: ${JSON.stringify(cat)}`;
      return 'undefined or null';
    }))];
    
    console.log("All categories found in posts:", categories);
  } else {
    console.log("No posts returned from Sanity");
  }
};
