
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { getArticlesByCategory } from '@/lib/articles';
import { getArticlesFromStorage } from '@/lib/utils/storageUtils';

const ArticlesBlog: React.FC = () => {
  const [articles, setArticles] = useState(getArticlesByCategory('blog'));

  // Update articles with the latest from storage (including comments)
  useEffect(() => {
    const storedArticles = getArticlesFromStorage();
    const blogArticles = storedArticles.filter(article => 
      article.category.toLowerCase() === 'blog'
    );
    if (blogArticles.length > 0) {
      setArticles(blogArticles);
    }
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
