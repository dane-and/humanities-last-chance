
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
    <div className="space-y-12">
      <div className="space-y-16">
        {currentPosts.map((post) => (
          <article key={post.id} className="prose prose-lg max-w-none">
            <h2 className="font-serif text-2xl font-bold mb-4">
              <Link 
                to={`/article/${post.slug}`} 
                className="hover:text-primary transition-colors no-underline"
              >
                {post.title}
              </Link>
            </h2>
            
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            
            <div className="flex items-center gap-x-3 text-sm text-muted-foreground mb-4">
              <span>{post.date}</span>
              <span>•</span>
              <Link 
                to={`/articles/${post.category.toLowerCase()}`}
                className="hover:text-primary"
              >
                {post.category}
              </Link>
              {post.comments && post.comments.length > 0 && (
                <>
                  <span>•</span>
                  <Link 
                    to={`/article/${post.slug}`}
                    className="flex items-center hover:text-primary"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
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
        <div className="flex justify-between items-center pt-8">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 hover:bg-primary/5"
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
            className="flex items-center gap-2 hover:bg-primary/5"
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
