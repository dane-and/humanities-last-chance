
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { Article } from '@/lib/types/article';
import { fetchArticlesByCategory, fetchBlogPosts } from '@/lib/sanity';
import { toast } from 'sonner';

/**
 * Safely extracts a category string from various possible formats
 */
const getCategoryString = (rawCategory: any): string => {
  // If null or undefined, return empty string
  if (rawCategory === null || rawCategory === undefined) {
    return '';
  }
  
  // If it's already a string
  if (typeof rawCategory === 'string') {
    return rawCategory;
  }
  
  // If it's an array, take the first string element
  if (Array.isArray(rawCategory) && rawCategory.length > 0) {
    if (typeof rawCategory[0] === 'string') {
      return rawCategory[0];
    }
  }
  
  // If it's an object with a name or title property
  if (rawCategory && typeof rawCategory === 'object') {
    if (typeof rawCategory.name === 'string') {
      return rawCategory.name;
    }
    if (typeof rawCategory.title === 'string') {
      return rawCategory.title;
    }
  }
  
  // Default fallback - empty string indicates we couldn't extract a category
  return '';
};

const ArticlesReviews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update articles with the latest from Sanity
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
              extractedCategory: getCategoryString(post.category)
            }))
          );
          
          // Now filter for reviews - using safe string extraction and lowercase comparison
          const reviewPosts = allSanityPosts.filter((post: any) => {
            // Get safe category string
            const categoryStr = getCategoryString(post.category);
            
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold mb-8">Reviews</h1>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div>
              {/* Debug section - only for development */}
              <div className="bg-gray-100 p-4 rounded mb-8">
                <h2 className="text-lg font-bold mb-2">Debugging Information:</h2>
                <p>Total posts loaded: {allPosts.length}</p>
                <p>Filtered review posts: {articles.length}</p>
                {error && <p className="text-red-500 font-bold">Error: {error}</p>}
                
                <div className="mt-2">
                  <h3 className="font-bold">All posts categories:</h3>
                  <ul className="list-disc pl-8">
                    {allPosts.length > 0 ? (
                      allPosts.map((post, index) => (
                        <li key={index}>
                          "{post.title}" - category: "{post.category || 'undefined'}" - 
                          slug: {post.slug?.current || 'undefined'}
                        </li>
                      ))
                    ) : (
                      <li className="text-red-500">No posts loaded from Sanity</li>
                    )}
                  </ul>
                </div>
              </div>
              
              {articles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No reviews available yet.</p>
                  <p className="text-muted-foreground mt-2">
                    {error || "Check that you have published reviews in Sanity Studio with category set to \"review\"."}
                  </p>
                </div>
              ) : (
                <ArticleGrid articles={articles} columns={3} />
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlesReviews;
