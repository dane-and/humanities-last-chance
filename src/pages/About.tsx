
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { usePages } from '@/lib/hooks/usePages';
import Hero from '@/components/Hero';

const About = () => {
  const { getPageBySlug, isLoading } = usePages();
  const aboutPage = getPageBySlug('about');
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Image Section */}
        <div className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden relative">
          <img 
            src="/lovable-uploads/a5d22cf7-d3be-41c9-a983-d3c178add6ef.png" 
            alt="Caravaggio's Narcissus painting" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
        </div>
        
        <section className="py-12 md:py-16">
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
