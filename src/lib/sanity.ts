
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
    `);
    
    console.log("Fetched raw posts from Sanity:", posts);
    
    // Verify category values in the raw data
    posts.forEach((post: any) => {
      console.log(`Raw post "${post.title}" has category:`, post.category);
      // Also log the publishedAt date for debugging
      console.log(`Raw post "${post.title}" has publishedAt:`, post.publishedAt);
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
    `, { slug });

    if (post) {
      console.log(`Found post with slug "${slug}":`, post);
      console.log(`Post category:`, post.category);
      console.log(`Post publishedAt:`, post.publishedAt);

      // ✅ Transform tags to array of strings
      post.tags = Array.isArray(post.tags) ? post.tags.map(t => t.label) : [];
    } else {
      console.log(`No post found with slug "${slug}"`);
    }

    return post;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
}
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
    `, { slug });
    
    if (post) {
      console.log(`Found post with slug "${slug}":`, post);
      console.log(`Post category:`, post.category);
      console.log(`Post publishedAt:`, post.publishedAt);
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
    `, { category });
    
    console.log(`Found ${posts.length} posts in category "${category}":`, posts);
    
    // Verify category values and publishedAt dates
    posts.forEach((post: any) => {
      console.log(`Post "${post.title}" has category "${post.category}" and publishedAt "${post.publishedAt}"`);
    });
    
    return posts;
  } catch (error) {
    console.error(`Error fetching articles with category ${category}:`, error);
    return [];
  }
}
