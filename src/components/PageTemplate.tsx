
import React from 'react';
import Footer from '@/components/Footer';
import { usePages } from '@/lib/hooks/usePages';
import sanitizeHtml from 'sanitize-html';

interface PageTemplateProps {
  slug: string;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ slug }) => {
  const { getPageBySlug, isLoading } = usePages();
  const pageContent = getPageBySlug(slug);
  
  // Sanitize HTML to prevent XSS
  const sanitizedContent = pageContent ? sanitizeHtml(pageContent.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      'img': ['src', 'alt', 'title', 'width', 'height', 'class'],
      'a': ['href', 'name', 'target', 'rel', 'class']
    }
  }) : '';
  
  return (
    <>
      <section className="py-4 md:py-6">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : pageContent ? (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
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
