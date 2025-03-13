
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useArticles } from '@/lib/articles';

const Resources = () => {
  // Get resources from the same storage as articles
  const { articles, isLoading } = useArticles();
  const resources = articles.filter(article => article.category === 'Resource');
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-8">Humanities Resources</h1>
            <p className="text-lg text-muted-foreground mb-12">
              A curated collection of resources for humanities scholars, students, and enthusiasts.
            </p>
            
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : resources.length > 0 ? (
              <div className="space-y-12">
                {resources.map((resource) => (
                  <div key={resource.id} className="border-b border-border/50 pb-8 mb-8 last:border-0">
                    <h2 className="text-2xl font-serif font-medium mb-4">{resource.title}</h2>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: resource.content }}></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-muted/30 rounded-lg border border-border/30">
                <h3 className="text-xl font-medium mb-2">No resources available yet</h3>
                <p className="text-muted-foreground">
                  Check back soon as we add valuable resources for the humanities community.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
