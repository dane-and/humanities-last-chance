
import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { getArticlesByTag, useArticles } from '@/lib/articles';

const TagsPage: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  const { articles, isLoading } = useArticles();
  
  const tagArticles = tag ? getArticlesByTag(tag, undefined, articles) : [];
  const decodedTag = tag ? decodeURIComponent(tag) : '';

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold mb-2">
            {isLoading ? 'Loading...' : `${decodedTag}`}
          </h1>
          
          <p className="text-muted-foreground mb-8">
            {isLoading ? '' : `${tagArticles.length} ${tagArticles.length === 1 ? 'article' : 'articles'} tagged with "${decodedTag}"`}
          </p>
          
          {!isLoading && tagArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No articles found with this tag.</p>
            </div>
          ) : (
            <ArticleGrid articles={tagArticles} columns={3} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TagsPage;
