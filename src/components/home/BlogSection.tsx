
import React from 'react';
import { useBlogPosts } from './blog/useBlogPosts';
import BlogArticleCard from './blog/BlogArticleCard';
import BlogPagination from './blog/BlogPagination';
import EmptyBlogMessage from './blog/EmptyBlogMessage';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';

interface BlogSectionProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  postsPerPage: number;
  fullContent?: boolean;
}

const BlogSection: React.FC<BlogSectionProps> = ({
  currentPage,
  setCurrentPage,
  postsPerPage,
  fullContent = false
}) => {
  const { blogPosts, isLoading, error } = useBlogPosts();
  
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
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-12">
        {[...Array(postsPerPage)].map((_, index) => (
          <div key={`skeleton-${index}`} className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load blog posts. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }
  
  // Show empty state if no posts
  if (blogPosts.length === 0) {
    return <EmptyBlogMessage />;
  }
  
  return (
    <div className="space-y-0">
      <div className="mb-8">
        {currentPosts.map((post, index) => (
          <BlogArticleCard 
            key={post.id} 
            post={post} 
            index={index}
            fullContent={fullContent}
            isLastItem={index === currentPosts.length - 1}
          />
        ))}
      </div>
      
      {!fullContent ? (
        <BlogPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      ) : (
        totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={prevPage}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    isActive={currentPage === i + 1}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={nextPage} 
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )
      )}
    </div>
  );
};

export default BlogSection;
