
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleGrid from '@/components/ArticleGrid';
import { useArticles } from '@/lib/hooks/useArticles';
import { fetchBlogPosts } from '@/lib/sanity';

const TagsPage: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  const { articles, isLoading, refreshArticles } = useArticles();

  // Force refresh articles to ensure we have latest data from Sanity
  useEffect(() => {
    const loadData = async () => {
      refreshArticles();
    };
    loadData();
  }, [refreshArticles, tag]);

  const normalizedTag = tag ? decodeURIComponent(tag) : '';
  console.log("TagsPage with normalizedTag:", normalizedTag);
  console.log("All available articles:", articles);

  const tagArticles = normalizedTag
    ? articles.filter(article => {
        // First ensure article.tags exists and is an array
        if (!Array.isArray(article.tags)) {
          console.log(`Article ${article.title} has no tags array`);
          return false;
        }
        
        // Filter out any null or undefined tags and check for tag match using type predicate
        const hasTag = article.tags
          .filter((t): t is string => t !== null && t !== undefined && typeof t === 'string')
          .some(t => {
            const match = t.toLowerCase() === normalizedTag.toLowerCase();
            console.log(`Comparing tag "${t}" with "${normalizedTag}": ${match}`);
            return match;
          });
        
        console.log(`Article "${article.title}" has tag "${normalizedTag}": ${hasTag}`);
        return hasTag;
      })
    : [];

  console.log("Filtered tag articles:", tagArticles);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold mb-2">
            {isLoading ? 'Loading...' : normalizedTag}
          </h1>

          <p className="text-muted-foreground mb-8">
            {isLoading ? '' : `${tagArticles.length} ${tagArticles.length === 1 ? 'article' : 'articles'} tagged with "${normalizedTag}"`}
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
