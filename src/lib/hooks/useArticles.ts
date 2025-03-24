
import { useState, useEffect } from 'react';
import { Article } from '../types/article';
import { toast } from 'sonner';
import { getArticlesFromStorage, saveArticlesToStorage } from '../utils/storage/articleStorage';
import { fetchBlogPosts } from '@/lib/sanity';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadArticles = async () => {
    setIsLoading(true);
    
    try {
      console.log('Loading articles from Sanity in useArticles hook');
      // Load articles from Sanity
      const posts = await fetchBlogPosts();
      
      if (posts && posts.length > 0) {
        // Convert Sanity posts to our Article format
        const formattedArticles = posts.map((post: any): Article => {
          // Ensure we're using the correct category type
          let typedCategory: Article['category'];
          const category = post.category || 'Blog';
          const lowerCaseCategory = typeof category === 'string' ? category.toLowerCase() : '';
          
          if (lowerCaseCategory === 'blog') {
            typedCategory = 'Blog';
          } else if (lowerCaseCategory === 'interview') {
            typedCategory = 'Interview';
          } else if (lowerCaseCategory === 'review') {
            typedCategory = 'Review';
          } else {
            typedCategory = 'Blog'; // Default
          }
          
          // Process tags
          const processedTags = Array.isArray(post.tags) 
            ? post.tags.map((tag: any) => {
                if (typeof tag === 'object' && tag !== null && tag.label) {
                  return tag.label;
                }
                return tag;
              }).filter((tag: any) => tag !== null && tag !== undefined)
            : [];
            
          console.log(`Article ${post.title} has tags:`, processedTags);
          
          return {
            id: post._id || `sanity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: post.title || "Untitled Post",
            slug: post.slug?.current || `post-${Date.now()}`,
            date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : new Date().toLocaleDateString(),
            category: typedCategory,
            image: post.mainImage?.asset?.url || '',
            imageCaption: post.mainImage?.caption || '',
            excerpt: post.excerpt || '',
            content: post.body || '',
            featured: false,
            tags: processedTags,
          };
        });
        
        setArticles(formattedArticles);
        setError(null);
      } else {
        // Use empty array
        setArticles([]);
      }
    } catch (err) {
      console.error('Error loading articles:', err);
      setError(err instanceof Error ? err : new Error('Unknown error loading articles'));
      
      // Use empty array on error
      setArticles([]);
      toast.error("Error loading articles.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
    
    // Add event listener for article updates
    const handleArticlesUpdated = () => {
      console.log('Articles updated event detected, reloading articles');
      loadArticles();
    };
    
    window.addEventListener('articlesUpdated', handleArticlesUpdated);
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('articlesUpdated', handleArticlesUpdated);
    };
  }, []);

  const refreshArticles = () => {
    loadArticles();
  };

  const updateArticles = (newArticles: Article[]) => {
    try {
      console.log('Updating articles in useArticles hook:', newArticles.length);
      saveArticlesToStorage(newArticles);
      setArticles(newArticles);
    } catch (err) {
      console.error('Error updating articles:', err);
      toast.error("Failed to update articles");
    }
  };

  return { articles, isLoading, error, refreshArticles, updateArticles };
};
