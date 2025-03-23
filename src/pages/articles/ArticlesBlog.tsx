
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { Article, defaultArticles } from '@/lib/types/article';
import { fetchBlogPosts } from '@/lib/sanity';

const ArticlesBlog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Update articles with the latest from Sanity
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      console.log("Loading blog articles from Sanity...");
      
      try {
        // Get all posts and filter on the client side for "Blog" category
        const sanityPosts = await fetchBlogPosts();
        
        // Check if we got any posts back
        if (sanityPosts && sanityPosts.length > 0) {
          // Filter for Blog category posts - sanityPosts are already properly mapped to Article type
          const blogArticles = sanityPosts.filter((post: Article) => 
            post.category === 'Blog'
          );
          
          console.log("Filtered and sorted blog articles:", 
            blogArticles.map(a => ({ title: a.title, category: a.category, publishedAt: a.publishedAt })));
          
          if (blogArticles.length > 0) {
            setArticles(blogArticles);
          } else {
            // If no blog posts from Sanity, use default blog articles
            console.log("No blog posts from Sanity, using default articles");
            const defaultBlogArticles = defaultArticles.filter(article => 
              article.category === 'Blog'
            );
            setArticles(defaultBlogArticles);
          }
        } else {
          // Use default articles if no posts from Sanity
          console.log("No posts from Sanity, using default articles");
          const defaultBlogArticles = defaultArticles.filter(article => 
            article.category === 'Blog'
          );
          setArticles(defaultBlogArticles);
        }
      } catch (error) {
        console.error("Error loading articles:", error);
        // Use default articles on error
        const defaultBlogArticles = defaultArticles.filter(article => 
          article.category === 'Blog'
        );
        setArticles(defaultBlogArticles);
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
          <h1 className="text-3xl font-serif font-bold mb-8">Blog Posts</h1>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No blog posts available yet.</p>
              <p className="text-muted-foreground mt-2">Check that you have published posts in Sanity Studio.</p>
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

export default ArticlesBlog;
