
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { getArticlesByCategory } from '@/lib/queries/articleQueries';
import { getArticlesFromStorage } from '@/lib/utils/storageUtils';
import { Article, defaultArticles } from '@/lib/types/article';

const ArticlesBlog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(getArticlesByCategory('blog'));

  // Update articles with the latest from storage (including comments)
  useEffect(() => {
    const storedArticles = getArticlesFromStorage();
    
    let blogArticles = storedArticles
      .filter(article => article.category.toLowerCase() === 'blog')
      // Sort articles by date (newest first)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
    // If no stored articles, use the default article
    if (blogArticles.length === 0 && defaultArticles.length > 0) {
      blogArticles = defaultArticles
        .filter(article => article.category.toLowerCase() === 'blog')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    setArticles(blogArticles);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold mb-8">Blog Posts</h1>
          
          {articles.length === 0 ? (
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
