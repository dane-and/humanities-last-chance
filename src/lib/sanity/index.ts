
// Re-export everything from the client
export { sanityClient, urlFor } from './client';

// Re-export PortableText component
export { PortableText } from './components';

// Re-export query functions
export { 
  fetchBlogPosts,
  fetchArticleBySlug,
  fetchArticlesByCategory
} from './queries/posts';
