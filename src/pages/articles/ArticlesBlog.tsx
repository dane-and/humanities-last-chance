
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { getArticlesByCategory } from '@/lib/queries/articleQueries';
import { getArticlesFromStorage } from '@/lib/utils/storage/articleStorage';
import { Article, defaultArticles } from '@/lib/types/article';

const ArticlesBlog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Update articles with the latest from storage (including comments)
  useEffect(() => {
    const loadArticles = () => {
      setLoading(true);
      console.log("Loading blog articles...");
      
      // Return empty array when in Lovable preview
      if (window.location.hostname === 'localhost' || 
          window.location.hostname.includes('lovable')) {
        console.log("Preview environment detected, returning empty article array");
        setArticles([]);
        setLoading(false);
        return;
      }
      
      // Get articles from storage
      const storedArticles = getArticlesFromStorage();
      console.log("Loaded articles from storage:", storedArticles);
      
      let blogArticles = storedArticles
        .filter(article => article.category.toLowerCase() === 'blog')
        // Sort articles by date (newest first)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
      // If no stored articles found for the blog category, use defaults
      if (blogArticles.length === 0) {
        console.log("No blog articles found in storage, checking defaults");
        blogArticles = defaultArticles
          .filter(article => article.category.toLowerCase() === 'blog')
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          
        console.log("Default blog articles:", blogArticles);
      }
      
      setArticles(blogArticles);
      setLoading(false);
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
