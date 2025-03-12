
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogSection from '@/components/home/BlogSection';
import SidebarSection from '@/components/home/SidebarSection';
import Hero from '@/components/Hero';
import { useArticles } from '@/lib/articles';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const { articles, isLoading } = useArticles();
  const [scrollY, setScrollY] = useState(0);
  
  // Track scroll position for animation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Get the first featured article or fallback
  const featuredArticle = !isLoading && articles.length > 0 
    ? articles.find(article => article.category === 'Blog') || articles[0]
    : null;
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      {featuredArticle && (
        <Hero
          title="Humanities Last Chance"
          subtitle="A digital magazine publishing daily blog posts, interviews, and reviews about humanities scholarship."
          backgroundImage={featuredArticle.image}
          buttonText="Start Reading"
          buttonLink="/articles/blog"
          overlay={true}
          size="medium"
          className="mt-14 md:mt-20"
        />
      )}
      
      <main className="flex-grow pt-12">
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div 
              className="flex flex-col lg:flex-row gap-8"
              style={{ 
                opacity: Math.min(1, 1 - (scrollY > 300 ? 0 : (300 - scrollY) / 300 * 0.3)),
                transform: `translateY(${scrollY > 300 ? 0 : (300 - scrollY) / 300 * 20}px)`,
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
              }}
            >
              <div className="w-full lg:w-2/3">
                <BlogSection 
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  postsPerPage={postsPerPage}
                />
              </div>
              
              <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
                <div className="sticky top-24">
                  <SidebarSection />
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
