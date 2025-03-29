
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText as SanityPortableText } from '@portabletext/react';

// Initialize the Sanity client
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nzyg33ca',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-05-03',
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

// Helper function to fetch article by slug (this is used in getStaticProps)
export async function fetchArticleBySlug(slug: string) {
  try {
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
    
    // Process image URL with optimized parameters
    if (post?.mainImage?.asset) {
      post.mainImage.url = urlFor(post.mainImage);
    }
    
    return post;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
}

// Helper function to fetch all articles (useful for getStaticPaths)
export async function fetchAllArticles() {
  try {
    const posts = await sanityClient.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt
      }
    `);
    
    return posts;
  } catch (error) {
    console.error("Error fetching all articles:", error);
    return [];
  }
}
