
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
      const categories = [...new Set(posts.map((post: any) => post.category))];
      console.log("Available categories in posts:", categories);
      
      // Filter posts by category (case-insensitive)
      const filteredPosts = posts.filter((post: any) => {
        if (!post.category) return false;
        
        // Simple string comparison (case-insensitive)
        return post.category.toLowerCase() === category.toLowerCase();
      });
      
      console.log(`Found ${filteredPosts.length} posts with category "${category}"`);
      return filteredPosts;
    }
    
    console.log("No posts found from Sanity");
    return [];
  } catch (error) {
    console.error(`Error fetching articles by category:`, error);
    return [];
  }
}
