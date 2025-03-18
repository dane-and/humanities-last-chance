
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleCardWithTags from '@/components/ArticleCardWithTags';
import { Button } from '@/components/ui/button';
import { getArticlesByCategory } from '@/lib/queries/articleQueries';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import TagList from '@/components/TagList';
import { getArticlesFromStorage } from '@/lib/utils/storage/articleStorage';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import OptimizedImage from '@/components/OptimizedImage';
import { Article } from '@/lib/types/article';

interface BlogSectionProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  postsPerPage: number;
}

const BlogSection: React.FC<BlogSectionProps> = ({
  currentPage,
  setCurrentPage,
  postsPerPage
}) => {
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
  
  // For debugging
  useEffect(() => {
    console.log("BlogSection mounted/updated with", blogPosts.length, "posts");
    if (blogPosts.length > 0) {
      console.log("Blog posts:", blogPosts);
    }
  }, [blogPosts]);
  
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  return (
    <div className="space-y-12">
      {blogPosts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No blog posts found. Please check your content storage.</p>
        </div>
      )}
      
      <div className="space-y-14">
        {currentPosts.map((post, index) => (
          <article 
            key={post.id} 
            className="prose prose-lg max-w-none fade-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h2 className="font-serif text-xl md:text-2xl font-bold mb-2">
              <Link 
                to={`/article/${post.slug}`} 
                className="hover:text-primary transition-colors no-underline"
                aria-label={`Read article: ${post.title}`}
              >
                {post.title}
              </Link>
            </h2>
            
            <div className="block text-sm text-muted-foreground mb-2">
              <span className="inline-block">{post.date}</span>
              <span className="inline-block mx-1" aria-hidden="true">•</span>
              <Link 
                to={`/articles/${post.category.toLowerCase()}`}
                className="inline-block hover:text-primary"
              >
                {post.category}
              </Link>
              {post.comments && post.comments.length > 0 && (
                <>
                  <span className="inline-block mx-1" aria-hidden="true">•</span>
                  <Link 
                    to={`/article/${post.slug}`}
                    className="inline-flex items-center hover:text-primary"
                    aria-label={`${post.comments.length} comment${post.comments.length !== 1 ? 's' : ''}`}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                    {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                  </Link>
                </>
              )}
            </div>
            
            {/* Add article image if available */}
            {post.image && post.image.trim() !== '' && (
              <div className="mb-4">
                <OptimizedImage
                  src={post.image}
                  alt={post.title}
                  className="w-full rounded-md"
                  caption={post.imageCaption}
                  width={1200}
                  height={800}
                />
              </div>
            )}
            
            <div 
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-2">
                <TagList tags={post.tags} />
              </div>
            )}
          </article>
        ))}
      </div>
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-8 mt-4">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 hover:bg-primary/5 focus:ring-2 focus:ring-primary/30"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </Button>
          
          <div className="text-sm" aria-live="polite">
            Page {currentPage} of {totalPages}
          </div>
          
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 hover:bg-primary/5 focus:ring-2 focus:ring-primary/30"
            aria-label="Next page"
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogSection;
