
import { toast } from 'sonner';
import { sanityClient } from '../client';
import { getSafeCategoryString, isCategoryMatch } from '../../utils/categoryUtils';
import { Article } from '../../types/article';

/**
 * Base post query fields to reuse across different queries
 */
const POST_PROJECTION = `
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
const handleSanityError = (error: any, message: string) => {
  console.error(message, error);
  toast.error("Failed to connect to Sanity CMS");
  return [];
};

/**
 * Maps a Sanity post to our Article interface
 */
const mapSanityPostToArticle = (post: any): Article => {
  // Extract category safely using utility function
  const categoryString = getSafeCategoryString(post.category);
  console.log(`Mapping post "${post.title}" with extracted category: "${categoryString}"`);
  
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
    category: categoryString,
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

/**
 * Logs sample post data for debugging purposes
 */
const logSamplePostData = (posts: any[]) => {
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
