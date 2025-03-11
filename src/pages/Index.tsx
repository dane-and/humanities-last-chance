
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
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          title="Humanities Last Chance"
          subtitle="A digital magazine publishing daily blog posts, interviews, and reviews about humanities scholarship."
        />
        
        {/* Content Section with Blog and Sidebar */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Blog Posts Column - Takes 2/3 of space on desktop */}
              <div className="w-full lg:w-2/3">
                <BlogSection 
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  postsPerPage={postsPerPage}
                />
              </div>
              
              {/* Sidebar - Takes 1/3 of space on desktop */}
              <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
                <SidebarSection />
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
