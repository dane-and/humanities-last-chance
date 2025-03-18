
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
  return builder.image(source);
}

// Create a reusable PortableText component
export const PortableText = SanityPortableText;

export async function fetchBlogPosts() {
  try {
    console.log("Fetching all blog posts from Sanity...");
    
    const posts = await sanityClient.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage{
          asset->{
            _id,
            url
          }
        },
        body,
        publishedAt,
        category,
        tags,
        excerpt
      }
    `);
    
    console.log("Fetched raw posts from Sanity:", posts);
    
    // Verify category values in the raw data
    posts.forEach((post: any) => {
      console.log(`Raw post "${post.title}" has category:`, post.category);
    });
    
    return posts;
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
          asset->{url}
        },
        body,
        publishedAt,
        category,
        tags,
        excerpt,
        comments
      }
    `, { slug });
    
    if (post) {
      console.log(`Found post with slug "${slug}":`, post);
      console.log(`Post category:`, post.category);
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
    
    // Use category exactly as provided without any case conversion
    const posts = await sanityClient.fetch(`
      *[_type == "post" && category == $category] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage{
          asset->{url}
        },
        body,
        publishedAt,
        category,
        tags,
        excerpt
      }
    `, { category });
    
    console.log(`Found ${posts.length} posts in category "${category}":`, posts);
    
    // Verify category values
    posts.forEach((post: any) => {
      console.log(`Post "${post.title}" has category "${post.category}"`);
    });
    
    return posts;
  } catch (error) {
    console.error(`Error fetching articles with category ${category}:`, error);
    return [];
  }
}
