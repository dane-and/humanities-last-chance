
import React, { useState, useEffect } from 'react';
import ArticleCardWithTags from '@/components/ArticleCardWithTags';
import { Button } from '@/components/ui/button';
import { getArticlesByCategory } from '@/lib/articles';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  
  // Handle navigation
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  return (
    <div className="space-y-10">
      <h2 className="font-serif text-2xl font-medium tracking-tight mb-8">
        Latest Blog Posts
      </h2>
      
      {/* Blog Posts */}
      <div className="space-y-12">
        {currentPosts.map((post) => (
          <ArticleCardWithTags
            key={post.id}
            article={post}
          />
        ))}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-8">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogSection;
