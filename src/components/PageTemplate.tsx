
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { usePages } from '@/lib/hooks/usePages';
import CaptionedImage from '@/components/CaptionedImage';

interface PageTemplateProps {
  slug: string;
  heroImage?: {
    src: string;
    alt: string;
    caption: string;
  };
}

const PageTemplate: React.FC<PageTemplateProps> = ({ slug, heroImage }) => {
  const { getPageBySlug, isLoading } = usePages();
  const pageContent = getPageBySlug(slug);
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Image Section - only render if heroImage is provided */}
        {heroImage && (
          <div className="w-full h-auto relative">
            <CaptionedImage 
              src={heroImage.src} 
              alt={heroImage.alt} 
              caption={heroImage.caption}
              imageClassName="w-full h-full object-cover object-center"
            />
          </div>
        )}
        
        <section className="py-8 md:py-10">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : pageContent ? (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: pageContent.content }}></div>
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

export default PageTemplate;
