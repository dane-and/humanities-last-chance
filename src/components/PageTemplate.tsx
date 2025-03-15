
import React from 'react';
import Footer from '@/components/Footer';
import { usePages } from '@/lib/hooks/usePages';

interface PageTemplateProps {
  slug: string;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ slug }) => {
  const { getPageBySlug, isLoading } = usePages();
  const pageContent = getPageBySlug(slug);
  
  return (
    <>
      <section className="py-4 md:py-6">
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
      
      <Footer />
    </>
  );
};

export default PageTemplate;
