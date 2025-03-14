
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { usePages } from '@/lib/hooks/usePages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import YouTubeUniversity from '@/components/resources/YouTubeUniversity';

const Resources = () => {
  const { getPageBySlug, isLoading } = usePages();
  const resourcesPage = getPageBySlug('resources');
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20 md:pt-24">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">Resources</h1>
            
            <Tabs defaultValue="general" className="w-full mt-6">
              <TabsList className="mb-8 w-full justify-start">
                <TabsTrigger value="general">General Resources</TabsTrigger>
                <TabsTrigger value="youtube">YouTube University</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="focus-visible:outline-none focus-visible:ring-0">
                {isLoading ? (
                  <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : resourcesPage ? (
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: resourcesPage.content }}></div>
                ) : (
                  <p className="text-muted-foreground">Content not available.</p>
                )}
              </TabsContent>
              
              <TabsContent value="youtube" className="focus-visible:outline-none focus-visible:ring-0">
                <YouTubeUniversity />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
