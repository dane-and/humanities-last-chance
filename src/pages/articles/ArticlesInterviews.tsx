
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { Article } from '@/lib/types/article';
import { fetchArticlesByCategory, fetchBlogPosts } from '@/lib/sanity';
import { toast } from 'sonner';

const ArticlesInterviews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update articles with the latest from Sanity
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError(null);
      
      console.log("Loading interview articles from Sanity...");
      
      try {
        // First try to get all posts to see what's coming from Sanity
        const allSanityPosts = await fetchBlogPosts();
        console.log(`Found ${allSanityPosts?.length || 0} total posts from Sanity`);
        
        // Store all posts to see what was actually returned
        setAllPosts(allSanityPosts || []);
        
        if (allSanityPosts && allSanityPosts.length > 0) {
          console.log("All categories in posts:", 
            [...new Set(allSanityPosts.map((post: any) => post.category))]);
          
          // Now filter for just interviews
          const interviewPosts = allSanityPosts.filter((post: any) => 
            post.category && post.category.toLowerCase() === 'interview'
          );
          
          console.log(`Found ${interviewPosts.length} interview posts after filtering`);
          
          // Convert Sanity posts to Article format
          const interviewArticles: Article[] = interviewPosts.map((post: any) => {
            const publishedDate = post.publishedAt 
              ? new Date(post.publishedAt) 
              : (post._createdAt ? new Date(post._createdAt) : new Date());
              
            console.log(`Mapping interview post: "${post.title}" with category "${post.category}"`);
            
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
              category: 'Interview', // Normalize category for frontend use
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
          
          console.log("Formatted interview articles:", interviewArticles);
          setArticles(interviewArticles);
        } else {
          console.log("No posts found from Sanity");
          setArticles([]);
          setError("No posts could be fetched from Sanity");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error("Error loading articles:", errorMessage);
        setError(`Error: ${errorMessage}`);
        toast.error("Failed to load interview articles");
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
          <h1 className="text-3xl font-serif font-bold mb-8">Interviews</h1>
          
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
                <p>Filtered interview posts: {articles.length}</p>
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
                  <p className="text-xl text-muted-foreground">No interviews available yet.</p>
                  <p className="text-muted-foreground mt-2">
                    {error || "Check that you have published interviews in Sanity Studio with category set to \"interview\"."}
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

export default ArticlesInterviews;
