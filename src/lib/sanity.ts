
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText as SanityPortableText } from '@portabletext/react';
import { toast } from 'sonner';

export const sanityClient = createClient({
  projectId: 'nzyg33ca',  // Using your provided Sanity project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03'
});

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
    
    // Simple query to get all posts
    const posts = await sanityClient.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
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
    
    console.log("Fetched raw posts from Sanity:", posts);
    
    // Verify category values in the raw data
    if (posts && posts.length > 0) {
      posts.forEach((post: any) => {
        console.log(`Raw post "${post.title}" has category:`, post.category);
        console.log(`Raw post "${post.title}" has publishedAt:`, post.publishedAt);
        console.log(`Raw post "${post.title}" has tags:`, post.tags);
      });
    } else {
      console.log("No posts returned from Sanity");
    }
    
    return posts;
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
    
    if (post) {
      console.log(`Found post with slug "${slug}":`, post);
      console.log(`Post category:`, post.category);
      console.log(`Post publishedAt:`, post.publishedAt);
      console.log(`Post tags:`, post.tags);
    } else {
      console.log(`No post found with slug "${slug}"`);
    }
    
    return post;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
}

export async function fetchArticlesByCategory(category: string) {
  try {
    // Debug which category is being requested
    console.log(`Fetching articles with category "${category}" from Sanity...`);
    
    // First get ALL posts without filtering
    const posts = await sanityClient.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
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
    
    // Log all posts to debug
    console.log(`Found ${posts ? posts.length : 0} total posts from Sanity before filtering:`, posts);
    
    // If we have posts, filter them client-side for the requested category
    if (posts && posts.length > 0) {
      // Log all posts' categories for debugging
      posts.forEach((post: any) => {
        console.log(`Post "${post.title}" has category "${post.category}"`);
      });
      
      // Filter posts by category (case-insensitive)
      const filteredPosts = posts.filter((post: any) => {
        // Skip undefined categories
        if (!post.category) {
          console.log(`Post "${post.title}" has no category defined`);
          return false;
        }
        
        // Compare lowercase versions
        const postCategory = post.category.toLowerCase();
        const requestedCategory = category.toLowerCase();
        const isMatch = postCategory === requestedCategory;
        
        console.log(`Post "${post.title}" category "${postCategory}" matches requested "${requestedCategory}"? ${isMatch}`);
        
        return isMatch;
      });
      
      console.log(`After filtering for category "${category}", found ${filteredPosts.length} posts:`, 
        filteredPosts.map(p => p.title));
      
      return filteredPosts;
    }
    
    console.log(`No posts found at all from Sanity`);
    return [];
  } catch (error) {
    console.error(`Error fetching articles by category:`, error);
    return [];
  }
}
