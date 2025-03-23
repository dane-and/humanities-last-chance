
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { Article } from '@/lib/types/article';
import { fetchArticlesByCategory } from '@/lib/sanity';

const ArticlesReviews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Update articles with the latest from Sanity
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      console.log("Loading review articles from Sanity...");
      
      try {
        // Use exact case "Review" for the API call
        const sanityPosts = await fetchArticlesByCategory('Review');
        console.log(`Found ${sanityPosts.length} review posts from Sanity`);
        
        // Convert Sanity posts to Article format
        const reviewArticles: Article[] = sanityPosts.map((post: any) => {
          const publishedDate = post.publishedAt 
            ? new Date(post.publishedAt) 
            : (post._createdAt ? new Date(post._createdAt) : new Date());
            
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
            category: post.category || 'Review', // Keep the exact case from Sanity
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
      } catch (error) {
        console.error("Error loading articles:", error);
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
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No reviews available yet.</p>
              <p className="text-muted-foreground mt-2">Check that you have published reviews in Sanity Studio.</p>
            </div>
          ) : (
            <ArticleGrid articles={articles} columns={3} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlesReviews;
