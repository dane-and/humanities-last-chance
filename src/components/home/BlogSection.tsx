
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getArticlesByCategory } from '@/lib/articles';

interface BlogSectionProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  postsPerPage: number;
}

const BlogSection: React.FC<BlogSectionProps> = ({
  currentPage,
  setCurrentPage,
  postsPerPage,
}) => {
  // Get all blog posts
  const allBlogPosts = getArticlesByCategory('blog');
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogPosts = allBlogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(allBlogPosts.length / postsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="lg:w-2/3">
      <div className="flex justify-between items-end mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">
          Latest Blog Posts
        </h2>
        <Link
          to="/articles/blog"
          className="hidden md:flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all posts
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      {/* Full Blog Posts */}
      <div className="space-y-12">
        {currentBlogPosts.map((post) => (
          <article key={post.id} className="pb-12 border-b border-border/50">
            <h3 className="font-serif text-2xl font-medium mb-2">
              <Link 
                to={`/article/${post.slug}`} 
                className="hover:text-primary/80 transition-colors"
              >
                {post.title}
              </Link>
            </h3>
            
            <div className="flex items-center gap-x-3 mb-4 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span>•</span>
              <Link 
                to={`/articles/${post.category.toLowerCase()}`}
                className="text-primary hover:text-primary/80"
              >
                {post.category}
              </Link>
            </div>
            
            {post.image && (
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-64 object-cover mb-6 rounded-md"
              />
            )}
            
            <div 
              className="prose-custom" 
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        ))}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
