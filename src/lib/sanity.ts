
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
    
    // Explicitly order by publishedAt in descending order
    // Add a projection to ensure we get publishedAt as an ISO string
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
        // Also log the publishedAt date for debugging
        console.log(`Raw post "${post.title}" has publishedAt:`, post.publishedAt);
        // And log tags if any
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
    console.log(`Fetching articles with category "${category}" - simplifying query for debugging`);
    
    // Simplified query that doesn't filter by category at all - to see ALL posts
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
      console.error(`Error in Sanity fetch:`, error);
      toast.error("Failed to connect to Sanity CMS");
      return [];
    });
    
    console.log(`Found ${posts ? posts.length : 0} total posts before filtering:`, posts);
    
    // Log all posts to see what we're getting
    if (posts && posts.length > 0) {
      posts.forEach((post: any) => {
        console.log(`Post "${post.title}" has category "${post.category}" - matching requested "${category}"?`, 
          post.category && post.category.toLowerCase() === category.toLowerCase());
      });
      
      // Now filter on the client side to see what matches
      const filteredPosts = posts.filter((post: any) => 
        post.category && post.category.toLowerCase() === category.toLowerCase()
      );
      
      console.log(`After filtering for category "${category}", found ${filteredPosts.length} posts:`, filteredPosts);
      
      // Return filtered posts for now
      return filteredPosts;
    } else {
      console.log(`No posts found at all`);
    }
    
    return posts || [];
  } catch (error) {
    console.error(`Error fetching articles:`, error);
    return [];
  }
}
