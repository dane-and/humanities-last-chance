
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ArticleGrid from '@/components/ArticleGrid';
import { getArticlesByCategory, articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  
  // Get all blog posts
  const allBlogPosts = getArticlesByCategory('blog');
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogPosts = allBlogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(allBlogPosts.length / postsPerPage);
  
  // Get other content - limit to 2 most recent for sidebar
  const interviews = getArticlesByCategory('interview', 2);
  const reviews = getArticlesByCategory('review', 2);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-16">
        {/* Hero Section - without button */}
        <Hero
          title="Humanities Last Chance"
          subtitle="A digital magazine publishing daily blog posts, interviews, and reviews about humanities scholarship."
        />
        
        {/* Content Section with Blog and Sidebar */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Blog Posts Column - 2/3 width on large screens */}
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
              
              {/* Sidebar - 1/3 width on large screens */}
              <div className="lg:w-1/3 space-y-10 mt-10 lg:mt-0">
                {/* Interviews Section */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <h2 className="font-serif text-xl font-medium tracking-tight">
                      Latest Interviews
                    </h2>
                    <Link
                      to="/articles/interviews"
                      className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      View all
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  
                  <div className="space-y-6">
                    {interviews.map((interview) => (
                      <article key={interview.id} className="border-b border-border/30 pb-4">
                        {interview.image && (
                          <Link to={`/article/${interview.slug}`}>
                            <img 
                              src={interview.image} 
                              alt={interview.title} 
                              className="w-full h-40 object-cover mb-3 rounded"
                            />
                          </Link>
                        )}
                        <h3 className="font-serif text-lg font-medium mb-2">
                          <Link 
                            to={`/article/${interview.slug}`} 
                            className="hover:text-primary/80 transition-colors"
                          >
                            {interview.title}
                          </Link>
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          {interview.date}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                
                {/* Reviews Section */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <h2 className="font-serif text-xl font-medium tracking-tight">
                      Latest Reviews
                    </h2>
                    <Link
                      to="/articles/reviews"
                      className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      View all
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <article key={review.id} className="border-b border-border/30 pb-4">
                        {review.image && (
                          <Link to={`/article/${review.slug}`}>
                            <img 
                              src={review.image} 
                              alt={review.title} 
                              className="w-full h-40 object-cover mb-3 rounded"
                            />
                          </Link>
                        )}
                        <h3 className="font-serif text-lg font-medium mb-2">
                          <Link 
                            to={`/article/${review.slug}`} 
                            className="hover:text-primary/80 transition-colors"
                          >
                            {review.title}
                          </Link>
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          {review.date}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
