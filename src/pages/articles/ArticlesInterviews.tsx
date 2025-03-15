
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { getArticlesByCategory } from '@/lib/queries/articleQueries';
import { Article } from '@/lib/types/article';

const ArticlesInterviews: React.FC = () => {
  const articles: Article[] = getArticlesByCategory('interview');

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold mb-8">Interviews</h1>
          
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">There are not yet any interviews to see, but there will be soon.</p>
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
