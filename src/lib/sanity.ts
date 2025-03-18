
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
    const posts = await sanityClient.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
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
    console.log("Fetched posts from Sanity:", posts);
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function fetchArticleBySlug(slug: string) {
  try {
    const post = await sanityClient.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
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
    return post;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
}

export async function fetchArticlesByCategory(category: string) {
  try {
    const posts = await sanityClient.fetch(`
      *[_type == "post" && category == $category] | order(publishedAt desc) {
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
    return posts;
  } catch (error) {
    console.error(`Error fetching articles with category ${category}:`, error);
    return [];
  }
}
