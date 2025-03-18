
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogSection from '@/components/home/BlogSection';
import SidebarSection from '@/components/home/SidebarSection';

const Index = () => {
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-16 md:pt-22">
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/3">
                <BlogSection 
                  currentPage={1}
                  setCurrentPage={() => {}}
                  postsPerPage={5}
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
