
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText as SanityPortableText } from '@portabletext/react';
import { toast } from 'sonner';
import { CMS_CONFIG } from './config';

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

export const sanityClient = createClient(sanityConfig);

// Set up image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Create a reusable PortableText component
export const PortableText = SanityPortableText;

// Safely get category string - utility function to avoid repetition
function getSafeCategoryString(category: any): string {
  if (typeof category === 'string') {
    return category;
  }
  
  if (Array.isArray(category) && category.length > 0) {
    if (typeof category[0] === 'string') {
      return category[0];
    }
  }
  
  if (category && typeof category === 'object') {
    if (typeof category.name === 'string') {
      return category.name;
    }
    if (typeof category.title === 'string') {
      return category.title;
    }
  }
  
  return ''; // Empty string if we can't extract a category
}

export async function fetchBlogPosts() {
  try {
    console.log("Fetching all blog posts from Sanity...");
    console.log("Using Sanity project ID:", projectId);
    
    // Simple query to get all posts without filtering
    const posts = await sanityClient.fetch(`
      *[_type == "post"] {
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
      }
    `)
    .catch(error => {
      console.error("Error in Sanity fetch:", error);
      toast.error("Failed to connect to Sanity CMS");
      return [];
    });
    
    console.log("Fetched posts from Sanity:", posts?.length || 0);
    
    // Debug posts data
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
    
    return posts || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    toast.error("Error loading posts from Sanity");
    return [];
  }
}

export async function fetchArticleBySlug(slug: string) {
  try {
    console.log(`Fetching article with slug "${slug}" from Sanity...`);
    
    const post = await sanityClient.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        mainImage{
          asset->{url},
          caption
        },
        body,
        publishedAt,
        _createdAt,
        _updatedAt,
        category,
        tags,
        excerpt,
        comments
      }
    `, { slug })
    .catch(error => {
      console.error(`Error in Sanity fetch for slug ${slug}:`, error);
      toast.error("Failed to connect to Sanity CMS");
      return null;
    });
    
    // Add more detailed logging of the category field
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
    
    return post;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
}

export async function fetchArticlesByCategory(category: string) {
  try {
    console.log(`Fetching articles with category "${category}" from Sanity...`);
    
    // First get ALL posts - simplified query to reduce complexity
    const posts = await sanityClient.fetch(`
      *[_type == "post"] {
        _id,
        title,
        slug,
        mainImage{
          asset->{url},
          caption
        },
        body,
        publishedAt,
        _createdAt,
        _updatedAt,
        category,
        tags,
        excerpt
      }
    `)
    .catch(error => {
      console.error(`Error in Sanity fetch for category ${category}:`, error);
      toast.error("Failed to connect to Sanity CMS");
      return [];
    });
    
    // Log all retrieved posts for debugging
    console.log(`Retrieved ${posts?.length || 0} total posts from Sanity`);
    
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
      
      // Filter posts by category (case-insensitive)
      const filteredPosts = posts.filter((post: any) => {
        if (!post.category) return false;
        
        // Safely extract category string for comparison
        let postCategoryStr = getSafeCategoryString(post.category);
        if (postCategoryStr === '') return false;
        
        // Convert to lowercase for comparison only if we have a string
        postCategoryStr = postCategoryStr.toLowerCase();
        
        // Now compare with the search category
        const searchCategory = category.toLowerCase();
        
        // Match exactly what's in Sanity
        if (postCategoryStr === searchCategory) return true;
        
        // Handle singular/plural differences
        if (searchCategory === 'review' && postCategoryStr === 'reviews') return true;
        if (searchCategory === 'reviews' && postCategoryStr === 'review') return true;
        if (searchCategory === 'interview' && postCategoryStr === 'interviews') return true;
        if (searchCategory === 'interviews' && postCategoryStr === 'interview') return true;
        
        return false;
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
    }
    
    console.log("No posts found from Sanity");
    return [];
  } catch (error) {
    console.error(`Error fetching articles by category:`, error);
    return [];
  }
}
