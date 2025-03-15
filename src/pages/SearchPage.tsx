
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { useArticles } from '@/lib/hooks/useArticles';
import { Article } from '@/lib/types/article';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { articles, isLoading } = useArticles();
  const [results, setResults] = useState<Article[]>([]);

  useEffect(() => {
    if (articles && query) {
      const searchResults = articles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase()) ||
        (article.tags && article.tags.some(tag => 
          tag.toLowerCase().includes(query.toLowerCase())
        ))
      );
      
      setResults(searchResults);
    }
  }, [query, articles]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold mb-8">
            {isLoading ? 'Searching...' : 
              `Search Results for "${query}" (${results.length} ${results.length === 1 ? 'article' : 'articles'})`}
          </h1>
          
          {!isLoading && results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No articles found for your search.</p>
              <p className="mt-2">Try different keywords or browse our categories.</p>
            </div>
          ) : (
            <ArticleGrid articles={results} columns={3} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
