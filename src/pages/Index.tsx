
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogSection from '@/components/home/BlogSection';
import SidebarSection from '@/components/home/SidebarSection';
import { useArticles } from '@/lib/articles';
import { createHamletArticleDirectly } from '@/scripts/publishHamletDraft';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const { articles, isLoading, refreshArticles } = useArticles();
  
  // Try to create the Hamlet article if needed
  useEffect(() => {
    // Check if this is the first load
    const hamletPublished = localStorage.getItem('hamlet-article-published');
    if (!hamletPublished) {
      console.log('First load detected, creating Hamlet article directly');
      // Only run this once
      createHamletArticleDirectly();
      localStorage.setItem('hamlet-article-published', 'true');
    }
  }, []);
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-16 md:pt-22">
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-8">
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
