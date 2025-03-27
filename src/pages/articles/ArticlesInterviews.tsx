import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { Article } from '@/lib/types/article';
import { fetchArticlesByCategory } from '@/lib/sanity';

const ArticlesInterviews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Update articles with the latest from Sanity
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      console.log("Loading interview articles from Sanity...");
      
      try {
        // Updated to use 'interviews' (lowercase, plural) to match Sanity schema
        const sanityPosts = await fetchArticlesByCategory('interviews');
        
        // Convert Sanity posts to Article format
        const interviewArticles: Article[] = sanityPosts.map((post: any) => ({
          id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: post.title || "Untitled Post",
          slug: post.slug?.current || `post-${Date.now()}`,
          date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : new Date().toLocaleDateString(),
          category: post.category || 'Interview', // Keep the exact case from Sanity
          image: post.mainImage?.asset?.url || '',
          imageCaption: post.mainImage?.caption || '',
          excerpt: post.excerpt || '',
          content: post.body || '',
          featured: false,
          tags: post.tags || [],
          publishedAt: post.publishedAt || post._createdAt || new Date().toISOString(),
        }));
        
        // Explicitly sort by publishedAt date in descending order
        const sortedInterviewArticles = interviewArticles.sort((a, b) => {
          const dateA = new Date(a.publishedAt || '').getTime();
          const dateB = new Date(b.publishedAt || '').getTime();
          return dateB - dateA;
        });
        
        console.log("Formatted and sorted interview articles:", sortedInterviewArticles);
        setArticles(sortedInterviewArticles);
      } catch (error) {
        console.error("Error loading articles:", error);
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
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No interviews available yet.</p>
              <p className="text-muted-foreground mt-2">Check that you have published interviews in Sanity Studio.</p>
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

export default ArticlesInterviews;
