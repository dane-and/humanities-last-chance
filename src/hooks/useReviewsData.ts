
import { useState, useEffect } from 'react';
import { Article } from '@/lib/types/article';
import { fetchBlogPosts } from '@/lib/sanity';
import { toast } from 'sonner';
import { getSafeCategoryString } from '@/lib/utils/categoryUtils';

export const useReviewsData = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError(null);
      
      console.log("Loading review articles from Sanity...");
      
      try {
        // First try to get all posts to see what's coming from Sanity
        const allSanityPosts = await fetchBlogPosts();
        console.log(`Found ${allSanityPosts?.length || 0} total posts from Sanity`);
        
        // Store all posts to see what was actually returned
        setAllPosts(allSanityPosts || []);
        
        if (allSanityPosts && allSanityPosts.length > 0) {
          // Log all categories with additional debug info
          console.log("All categories in posts:", 
            allSanityPosts.map((post: any) => ({
              title: post.title,
              categoryType: typeof post.category,
              categoryValue: post.category,
              extractedCategory: getSafeCategoryString(post.category)
            }))
          );
          
          // Now filter for reviews - using safe string extraction and lowercase comparison
          const reviewPosts = allSanityPosts.filter((post: any) => {
            // Get safe category string
            const categoryStr = getSafeCategoryString(post.category);
            
            // Check if this is a review post (handle both singular and plural)
            if (!categoryStr) return false;
            
            const lowerCaseCat = categoryStr.toLowerCase();
            return lowerCaseCat === 'reviews' || lowerCaseCat === 'review';
          });
          
          console.log(`Found ${reviewPosts.length} review posts after filtering`);
          
          // Convert Sanity posts to Article format
          const reviewArticles: Article[] = reviewPosts.map((post: any) => {
            const publishedDate = post.publishedAt 
              ? new Date(post.publishedAt) 
              : (post._createdAt ? new Date(post._createdAt) : new Date());
              
            console.log(`Mapping review post: "${post.title}" with category "${post.category}"`);
            
            return {
              id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              title: post.title || "Untitled Post",
              slug: post.slug?.current || `post-${Date.now()}`,
              date: publishedDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              publishedAt: post.publishedAt || post._createdAt || new Date().toISOString(),
              category: 'Review', // Normalize category for frontend use
              image: post.mainImage?.asset?.url || '',
              imageCaption: post.mainImage?.caption || '',
              excerpt: post.excerpt || '',
              content: post.body || '',
              featured: false,
              tags: post.tags || [],
            };
          }).sort((a, b) => {
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          });
          
          console.log("Formatted review articles:", reviewArticles);
          setArticles(reviewArticles);
        } else {
          console.log("No posts found from Sanity");
          setArticles([]);
          setError("No posts could be fetched from Sanity");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error("Error loading articles:", errorMessage);
        setError(`Error: ${errorMessage}`);
        toast.error("Failed to load review articles");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
  }, []);

  return { articles, allPosts, loading, error };
};
