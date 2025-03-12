
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleCardWithTags from '@/components/ArticleCardWithTags';
import { Button } from '@/components/ui/button';
import { getArticlesByCategory } from '@/lib/articles';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import TagList from '@/components/TagList';
import { getArticlesFromStorage } from '@/lib/utils/storageUtils';

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
  const [blogPosts, setBlogPosts] = useState(getArticlesByCategory('blog'));
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  
  // Update blog posts with the latest from storage (including comments)
  useEffect(() => {
    const articles = getArticlesFromStorage();
    const blogArticles = articles.filter(article => 
      article.category.toLowerCase() === 'blog'
    );
    if (blogArticles.length > 0) {
      setBlogPosts(blogArticles);
    }
  }, []);
  
  // Handle navigation
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
  
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  return (
    <div className="space-y-12">
      <div className="space-y-16">
        {currentPosts.map((post, index) => (
          <article 
            key={post.id} 
            className="prose prose-lg max-w-none fade-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              <Link 
                to={`/article/${post.slug}`} 
                className="hover:text-primary transition-colors no-underline"
                aria-label={`Read article: ${post.title}`}
              >
                {post.title}
              </Link>
            </h2>
            
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
                loading={index < 2 ? "eager" : "lazy"}
              />
            )}
            
            <div className="flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground mb-4">
              <span>{post.date}</span>
              <span aria-hidden="true">•</span>
              <Link 
                to={`/articles/${post.category.toLowerCase()}`}
                className="hover:text-primary"
              >
                {post.category}
              </Link>
              {post.comments && post.comments.length > 0 && (
                <>
                  <span aria-hidden="true">•</span>
                  <Link 
                    to={`/article/${post.slug}`}
                    className="flex items-center hover:text-primary"
                    aria-label={`${post.comments.length} comment${post.comments.length !== 1 ? 's' : ''}`}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                    {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                  </Link>
                </>
              )}
            </div>
            
            <div className="text-muted-foreground">
              {post.content}
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6">
                <TagList tags={post.tags} />
              </div>
            )}
          </article>
        ))}
      </div>
      
      {/* Pagination Controls with updated button styles */}
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
