
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogSection from '@/components/home/BlogSection';
import SidebarSection from '@/components/home/SidebarSection';
import { useArticles } from '@/lib/articles';
import { Button } from '@/components/ui/button'; 
import { publishHamletDraft } from '@/scripts/publishHamletDraft';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const { articles, isLoading, refreshArticles } = useArticles();
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-16 md:pt-22">
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            {/* Admin helper button - visible only in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">Admin Actions:</h3>
                <Button 
                  onClick={publishHamletDraft}
                  size="sm"
                  variant="outline"
                  className="mr-2"
                >
                  Publish "Should Hamlet Take Prozac" Draft
                </Button>
                <Button 
                  onClick={refreshArticles}
                  size="sm"
                  variant="outline"
                >
                  Refresh Articles
                </Button>
              </div>
            )}
            
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
