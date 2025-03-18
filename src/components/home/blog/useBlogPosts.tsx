
import { useState, useEffect } from 'react';
import { Article } from '@/lib/types/article';
import { getArticlesByCategory } from '@/lib/queries/articleQueries';
import { getArticlesFromStorage } from '@/lib/utils/storage/articleStorage';

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<Article[]>([]);
  
  const fetchBlogPosts = () => {
    console.log("Fetching blog posts...");
    const articles = getArticlesFromStorage();
    console.log("All articles:", articles);
    
    if (!articles || articles.length === 0) {
      console.warn("No articles found in storage!");
      setBlogPosts([]);
      return;
    }
    
    const blogArticles = getArticlesByCategory('blog', undefined, articles);
    console.log("Filtered blog articles:", blogArticles);
    
    if (blogArticles.length > 0) {
      // Sort by date, newest first
      const sortedArticles = [...blogArticles].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setBlogPosts(sortedArticles);
    } else {
      console.warn("No blog articles found!");
      
      // Check if there are any articles with case-insensitive 'blog' category
      const caseInsensitiveBlogArticles = articles.filter(
        article => article.category.toLowerCase() === 'blog'
      );
      
      if (caseInsensitiveBlogArticles.length > 0) {
        console.log("Found articles with case-insensitive 'blog' category:", caseInsensitiveBlogArticles);
        // Sort by date, newest first
        const sortedArticles = [...caseInsensitiveBlogArticles].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setBlogPosts(sortedArticles);
      } else {
        setBlogPosts([]);
      }
    }
  };
  
  useEffect(() => {
    fetchBlogPosts();
    
    // Add event listener for article updates with a more specific name for debugging
    const handleArticlesUpdatedEvent = () => {
      console.log('articlesUpdated event detected in BlogSection, reloading blog posts');
      fetchBlogPosts();
    };
    
    window.addEventListener('articlesUpdated', handleArticlesUpdatedEvent);
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('articlesUpdated', handleArticlesUpdatedEvent);
    };
  }, []);
  
  return { blogPosts, fetchBlogPosts };
};
