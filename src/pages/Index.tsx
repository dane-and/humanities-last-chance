
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ArticleGrid from '@/components/ArticleGrid';
import SubscribeForm from '@/components/SubscribeForm';
import { getArticlesByCategory, getLatestArticles } from '@/lib/articles';

const Index = () => {
  const blogPosts = getArticlesByCategory('blog', 5);
  const interviews = getArticlesByCategory('interview', 4);
  const reviews = getArticlesByCategory('review', 4);
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <Hero
          title="Humanities Last Chance"
          subtitle="A digital magazine publishing daily blog posts, interviews, and reviews about humanities scholarship."
          buttonText="Start Reading"
          buttonLink="/articles/blog"
        />
        
        {/* Blog Posts Section */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            
            <ArticleGrid articles={blogPosts} columns={3} />
            
            <div className="mt-8 text-center md:hidden">
              <Link
                to="/articles/blog"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View all posts
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Interviews and Reviews Sections */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Interviews */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <h2 className="font-serif text-xl md:text-2xl font-medium tracking-tight">
                    Interviews
                  </h2>
                  <Link
                    to="/articles/interviews"
                    className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View all
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                
                <div className="space-y-4">
                  <ArticleGrid 
                    articles={interviews} 
                    columns={2} 
                    variant="compact" 
                    className="gap-4"
                  />
                </div>
              </div>
              
              {/* Reviews */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <h2 className="font-serif text-xl md:text-2xl font-medium tracking-tight">
                    Reviews
                  </h2>
                  <Link
                    to="/articles/reviews"
                    className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View all
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                
                <div className="space-y-4">
                  <ArticleGrid 
                    articles={reviews} 
                    columns={2} 
                    variant="compact" 
                    className="gap-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SubscribeForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
