
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { useArticles } from '@/lib/hooks/useArticles';
import { fetchBlogPosts } from '@/lib/sanity';

const TagsPage: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  const { articles, isLoading, refreshArticles } = useArticles();
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);

  // Force refresh articles to ensure we have latest data from Sanity
  useEffect(() => {
    refreshArticles();
  }, [refreshArticles]);

  // Filter articles when they or the tag changes
  useEffect(() => {
    if (!isLoading && articles.length > 0 && tag) {
      const normalizedTag = decodeURIComponent(tag).toLowerCase();
      console.log(`Filtering articles for tag: "${normalizedTag}"`);
      console.log(`Total articles available: ${articles.length}`);
      
      const filtered = articles.filter(article => {
        // Ensure article.tags exists
        if (!Array.isArray(article.tags)) {
          console.log(`Article ${article.title} has no tags array`);
          return false;
        }
        
        // Process and normalize tags
        const normalizedArticleTags = article.tags
          .filter((t): t is string => t !== null && t !== undefined && typeof t === 'string')
          .map(t => t.toLowerCase());
        
        // Check if the normalized tag is in the article's normalized tags
        const hasTag = normalizedArticleTags.includes(normalizedTag);
        console.log(`Article "${article.title}" has normalized tags: [${normalizedArticleTags.join(', ')}]`);
        console.log(`Article "${article.title}" has tag "${normalizedTag}": ${hasTag}`);
        
        return hasTag;
      });
      
      console.log(`Filtered articles for tag "${normalizedTag}": ${filtered.length}`);
      setFilteredArticles(filtered);
    }
  }, [articles, tag, isLoading]);

  // Decode tag for display
  const displayTag = tag ? decodeURIComponent(tag) : '';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold mb-2">
            {isLoading ? 'Loading...' : displayTag}
          </h1>

          <p className="text-muted-foreground mb-8">
            {isLoading 
              ? 'Loading articles...' 
              : `${filteredArticles.length} ${filteredArticles.length === 1 ? 'article' : 'articles'} tagged with "${displayTag}"`
            }
          </p>

          {!isLoading && filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No articles found with this tag.</p>
            </div>
          ) : (
            <ArticleGrid articles={filteredArticles} columns={3} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TagsPage;
