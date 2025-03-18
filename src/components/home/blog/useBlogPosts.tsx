
import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types/article';
import { getArticlesByCategory } from '@/lib/queries/articleQueries';
import { getArticlesFromStorage } from '@/lib/utils/storage/articleStorage';
import { toast } from 'sonner';

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBlogPosts = useCallback(() => {
    console.log("Fetching blog posts...");
    setIsLoading(true);
    setError(null);
    
    try {
      // Get all articles from storage
      const articles = getArticlesFromStorage();
      console.log(`Retrieved ${articles.length} total articles from storage`);
      
      if (!articles || articles.length === 0) {
        console.warn("No articles found in storage");
        
        // Add sample articles in development/preview environments
        if (process.env.NODE_ENV !== 'production' || 
            window.location.hostname === 'localhost' || 
            window.location.hostname.includes('lovable')) {
          const sampleArticles = getSampleArticles();
          console.log(`Adding ${sampleArticles.length} sample articles for development`);
          setBlogPosts(sampleArticles);
          setIsLoading(false);
          return;
        }
        
        setBlogPosts([]);
        return;
      }
      
      // First try with exact case match for 'Blog' category
      let blogArticles = getArticlesByCategory('Blog', undefined, articles);
      
      // If no exact matches, try case-insensitive match
      if (blogArticles.length === 0) {
        console.log("No exact 'Blog' category matches, trying case-insensitive search");
        blogArticles = articles.filter(
          article => article.category.toLowerCase() === 'blog'
        );
        
        if (blogArticles.length > 0) {
          console.log(`Found ${blogArticles.length} articles with case-insensitive 'blog' category`);
        }
      } else {
        console.log(`Found ${blogArticles.length} 'Blog' category articles`);
      }
      
      // Sort articles by date (newest first) and update state
      if (blogArticles.length > 0) {
        const sortedArticles = [...blogArticles].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setBlogPosts(sortedArticles);
      } else {
        console.warn("No blog articles found after searching");
        setBlogPosts([]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error fetching blog posts';
      console.error('Error fetching blog posts:', errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));
      toast.error("Failed to load blog posts");
      setBlogPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Helper function to create sample articles for development/preview
  const getSampleArticles = (): Article[] => {
    return [
      {
        id: 'sample-1',
        title: 'Sample Article 1',
        slug: 'sample-article-1',
        author: 'Sample Author',
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        category: 'Blog',
        image: '',
        excerpt: 'This is a sample article for development and testing.',
        content: '<p>This is a sample article that appears in development and preview environments to help with testing and demonstration.</p>',
        featured: true,
        comments: [],
        tags: ['Sample', 'Development']
      },
      {
        id: 'sample-2',
        title: 'Sample Article 2',
        slug: 'sample-article-2',
        author: 'Sample Author',
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        category: 'Blog',
        image: '',
        excerpt: 'Another sample article for testing purposes.',
        content: '<p>This is another sample article for development and preview environments.</p>',
        featured: false,
        comments: [],
        tags: ['Sample', 'Testing']
      }
    ];
  };
  
  useEffect(() => {
    fetchBlogPosts();
    
    // Add event listener for article updates with a specific name for debugging
    const handleArticlesUpdatedEvent = () => {
      console.log('articlesUpdated event detected in useBlogPosts, refreshing posts');
      fetchBlogPosts();
    };
    
    window.addEventListener('articlesUpdated', handleArticlesUpdatedEvent);
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('articlesUpdated', handleArticlesUpdatedEvent);
    };
  }, [fetchBlogPosts]);
  
  return { blogPosts, isLoading, error, fetchBlogPosts };
};
