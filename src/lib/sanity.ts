
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText as SanityPortableText } from '@portabletext/react';

export const sanityClient = createClient({
  projectId: 'nzyg33ca',  // Using your provided Sanity project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03'
});

// Set up image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source) return '';
  
  // Create a configured image builder
  const imageBuilder = builder.image(source);
  
  // If the source has hotspot info, use it
  if (source.hotspot) {
    imageBuilder.fit('crop')
      .crop('focalpoint')
      .focalPoint(source.hotspot.x, source.hotspot.y);
  }
  
  // Standardize all image sizes to 600x450
  return imageBuilder
    .width(600)
    .height(450)
    .format('webp')
    .quality(85)
    .url();
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
          hotspot,
          caption,
          alt
        },
        body,
        publishedAt,
        _createdAt,
        _updatedAt,
        category,
        tags,
        excerpt
      }
    `);
    
    console.log("Fetched raw posts from Sanity:", posts);
    
    // Process image URLs with optimized parameters
    const processedPosts = posts.map((post: any) => {
      if (post.mainImage && post.mainImage.asset) {
        post.mainImage.url = urlFor(post.mainImage);
      }
      
      // Process tags to handle both string arrays and object arrays
      if (Array.isArray(post.tags)) {
        post.tags = post.tags.map((tag: any) => {
          if (typeof tag === 'object' && tag !== null && tag.label) {
            return tag.label;
          }
          return tag;
        }).filter(Boolean);
      }
      
      return post;
    });
    
    return processedPosts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
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
          asset->{url, _id},
          hotspot,
          caption,
          alt
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
    `, { slug });
    
    if (post) {
      console.log(`Found post with slug "${slug}":`, post);
      
      // Process image URL with optimized parameters
      if (post.mainImage && post.mainImage.asset) {
        post.mainImage.url = urlFor(post.mainImage);
      }
      
      // Process tags to handle both string arrays and object arrays
      if (Array.isArray(post.tags)) {
        post.tags = post.tags.map((tag: any) => {
          if (typeof tag === 'object' && tag !== null && tag.label) {
            return tag.label;
          }
          return tag;
        }).filter(Boolean);
        
        console.log("Processed tags:", post.tags);
      }
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
    console.log(`Fetching articles with category "${category}"`);
    
    // Updated to use case-insensitive comparison with lower() function
    const posts = await sanityClient.fetch(`
      *[_type == "post" && lower(category) == lower($category)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage{
          asset->{url, _id},
          hotspot,
          caption,
          alt
        },
        body,
        publishedAt,
        _createdAt,
        _updatedAt,
        category,
        tags,
        excerpt
      }
    `, { category });
    
    console.log(`Found ${posts.length} posts in category "${category}":`, posts);
    
    // Process image URLs with optimized parameters and tags
    const processedPosts = posts.map((post: any) => {
      if (post.mainImage && post.mainImage.asset) {
        post.mainImage.url = urlFor(post.mainImage);
      }
      
      // Process tags to handle both string arrays and object arrays
      if (Array.isArray(post.tags)) {
        post.tags = post.tags.map((tag: any) => {
          if (typeof tag === 'object' && tag !== null && tag.label) {
            return tag.label;
          }
          return tag;
        }).filter(Boolean);
      }
      
      return post;
    });
    
    return processedPosts;
  } catch (error) {
    console.error(`Error fetching articles with category ${category}:`, error);
    return [];
  }
}
