
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
          // Convert Sanity posts to Article format and filter for Blog category
          const blogArticles: Article[] = sanityPosts
            .filter((post: any) => 
              post.category?.toLowerCase() === 'blog'
            )
            .map((post: any) => ({
              id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              title: post.title || "Untitled Post",
              slug: post.slug?.current || `post-${Date.now()}`,
              date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : new Date().toLocaleDateString(),
              category: 'Blog', // Always use properly capitalized category
              image: post.mainImage?.asset?.url || '',
              imageCaption: post.mainImage?.caption || '',
              excerpt: post.excerpt || '',
              content: post.body || '',
              featured: false,
              tags: post.tags || [],
            }));
          
          console.log("Formatted blog articles:", blogArticles);
          setArticles(blogArticles);
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
