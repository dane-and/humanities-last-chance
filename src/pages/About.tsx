
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { usePages } from '@/lib/hooks/usePages';

const About = () => {
  const { getPageBySlug, isLoading } = usePages();
  const aboutPage = getPageBySlug('about');
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Image Section - positioned below navigation */}
        <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] relative mt-20">
          <img 
            src="/lovable-uploads/6410840d-c1c9-43f2-a153-7cfe45e01e92.png" 
            alt="Turner's Venice painting" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]"></div>
        </div>
        
        <section className="py-8 md:py-10">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : aboutPage ? (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: aboutPage.content }}></div>
            ) : (
              <p className="text-muted-foreground">Content not available.</p>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
