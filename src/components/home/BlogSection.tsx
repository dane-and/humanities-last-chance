
import React, { useState, useEffect } from 'react';
import { useBlogPosts } from './blog/useBlogPosts';
import BlogArticleCard from './blog/BlogArticleCard';
import BlogPagination from './blog/BlogPagination';
import EmptyBlogMessage from './blog/EmptyBlogMessage';
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
  const { blogPosts } = useBlogPosts();
  
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
      {blogPosts.length === 0 && <EmptyBlogMessage />}
      
      <div className="space-y-14">
        {currentPosts.map((post, index) => (
          <BlogArticleCard 
            key={post.id} 
            post={post} 
            index={index} 
          />
        ))}
      </div>
      
      <BlogPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default BlogSection;
