
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BlogSection from '@/components/home/BlogSection';
import SidebarSection from '@/components/home/SidebarSection';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  
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
              {/* Blog Posts Column - Takes 2/3 of space on desktop */}
              <div className="lg:w-2/3">
                <BlogSection 
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  postsPerPage={postsPerPage}
                />
              </div>
              
              {/* Sidebar - Takes 1/3 of space on desktop */}
              <SidebarSection />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
