
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleGrid from '@/components/ArticleGrid';
import SubscribeForm from '@/components/SubscribeForm';
import { getFeaturedArticles, getLatestArticles, getArticlesByCategory } from '@/lib/articles';

const Index = () => {
  const featuredArticles = getFeaturedArticles();
  const latestArticles = getLatestArticles(3);
  const blogPosts = getArticlesByCategory('blog', 4);
  const interviews = getArticlesByCategory('interview', 2);
  const reviews = getArticlesByCategory('review', 2);
  
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
        
        {/* Featured Articles */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">
                Featured Articles
              </h2>
              <Link
                to="/articles/blog"
                className="hidden md:flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View all articles
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="space-y-8">
              {featuredArticles.map((article, index) => (
                <FeaturedArticle
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  author={article.author}
                  date={article.date}
                  image={article.image}
                  slug={article.slug}
                  layout={index % 2 === 0 ? 'horizontal' : 'horizontal'}
                />
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link
                to="/articles/blog"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View all articles
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Latest Articles */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">
                Latest Articles
              </h2>
              <Link
                to="/articles/blog"
                className="hidden md:flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <ArticleGrid articles={latestArticles} columns={3} />
            
            <div className="mt-8 text-center md:hidden">
              <Link
                to="/articles/blog"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Blog Posts */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <h2 className="font-serif text-xl font-medium tracking-tight">
                    Blog Posts
                  </h2>
                  <Link
                    to="/articles/blog"
                    className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View all
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <ArticleCard
                      key={post.id}
                      title={post.title}
                      category={post.category}
                      author={post.author}
                      date={post.date}
                      image={post.image}
                      slug={post.slug}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
              
              {/* Interviews */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <h2 className="font-serif text-xl font-medium tracking-tight">
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
                  {interviews.map((interview) => (
                    <ArticleCard
                      key={interview.id}
                      title={interview.title}
                      category={interview.category}
                      author={interview.author}
                      date={interview.date}
                      image={interview.image}
                      slug={interview.slug}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
              
              {/* Reviews */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <h2 className="font-serif text-xl font-medium tracking-tight">
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
                  {reviews.map((review) => (
                    <ArticleCard
                      key={review.id}
                      title={review.title}
                      category={review.category}
                      author={review.author}
                      date={review.date}
                      image={review.image}
                      slug={review.slug}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16">
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
