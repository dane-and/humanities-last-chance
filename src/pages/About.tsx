
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
      
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-8">About Us</h1>
            
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
