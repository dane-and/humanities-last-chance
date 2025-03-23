
import { useState, useEffect } from 'react';
import { Article } from '@/lib/types/article';
import { fetchBlogPosts } from '@/lib/sanity';
import { toast } from 'sonner';
import { getSafeCategoryString, getNormalizedCategory } from '@/lib/utils/categoryUtils';
import { mapSanityPostToArticle } from '@/lib/sanity/queries/posts/utils';

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
          const reviewPosts = allSanityPosts.filter((post: Article) => {
            const categoryStr = typeof post.category === 'string' ? post.category.toLowerCase() : '';
            return categoryStr === 'review' || categoryStr === 'reviews';
          });
          
          console.log(`Found ${reviewPosts.length} review posts after filtering`);
          
          // Articles are already mapped by fetchBlogPosts
          setArticles(reviewPosts);
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
