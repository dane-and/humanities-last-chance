
import { useState, useEffect } from 'react';
import { Article } from '@/lib/types/article';
import { sanityClient } from '@/lib/sanity/client';
import { toast } from 'sonner';
import { getSafeCategoryString, getNormalizedCategory } from '@/lib/utils/categoryUtils';
import { testSanityConnection } from '@/lib/sanity/client';
import { mapSanityPostToArticle } from '@/lib/sanity/queries/posts/utils';

export const useReviewsData = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionChecked, setConnectionChecked] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError(null);
      
      console.log("Loading review articles from Sanity...");
      
      try {
        // First check connection to Sanity
        if (!connectionChecked) {
          const connected = await testSanityConnection();
          setConnectionChecked(true);
          if (!connected) {
            throw new Error("Failed to connect to Sanity CMS");
          }
        }
        
        // Use a direct GROQ query to get reviews by category
        // This uses case-insensitive matching with a regex
        const reviewQuery = `*[_type == "post" && category match "(?i)review" && defined(slug.current)] | order(publishedAt desc)`;
        console.log("Executing Sanity query for reviews:", reviewQuery);
        
        const allSanityPosts = await sanityClient.fetch(reviewQuery);
        console.log(`Found ${allSanityPosts?.length || 0} review posts from Sanity with direct query`);
        
        // Store all posts to see what was actually returned
        setAllPosts(allSanityPosts || []);
        
        if (allSanityPosts && allSanityPosts.length > 0) {
          // Log all categories with additional debug info
          console.log("All categories in review posts:", 
            allSanityPosts.map((post: any) => ({
              title: post.title,
              categoryType: typeof post.category,
              categoryValue: post.category,
              slug: post.slug?.current,
              extractedCategory: getSafeCategoryString(post.category)
            }))
          );
          
          // Map to Article type with proper category normalization
          const typedReviews = allSanityPosts.map(mapSanityPostToArticle);
          console.log("Mapped review articles:", typedReviews.map(a => ({ 
            title: a.title, 
            slug: a.slug,
            category: a.category 
          })));
          
          setArticles(typedReviews);
        } else {
          console.log("No review posts found from Sanity");
          setArticles([]);
          setError("No review posts could be fetched from Sanity");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error("Error loading review articles:", errorMessage);
        setError(`Error: ${errorMessage}`);
        toast.error("Failed to load review articles");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
  }, [connectionChecked]);

  return { articles, allPosts, loading, error };
};
