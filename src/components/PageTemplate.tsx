
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { usePages } from '@/lib/hooks/usePages';

interface PageTemplateProps {
  slug: string;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ slug }) => {
  const { getPageBySlug, isLoading } = usePages();
  const pageContent = getPageBySlug(slug);
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
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
