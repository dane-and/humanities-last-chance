
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { usePages } from '@/lib/hooks/usePages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HumanitiesLastChanceU from '@/components/resources/HumanitiesLastChanceU';
import OtherResources from '@/components/resources/OtherResources';

const Resources = () => {
  const { getPageBySlug, isLoading } = usePages();
  const resourcesPage = getPageBySlug('resources');
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the tab from the URL query parameter, defaulting to 'humanities-u'
  const getTabFromURL = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('tab') || 'humanities-u';
  };
  
  // Update the URL when the tab changes
  const handleTabChange = (tab: string) => {
    navigate(`/resources?tab=${tab}`, { replace: true });
  };
  
  // Set the default tab based on URL on component mount
  useEffect(() => {
    if (!location.search) {
      navigate(`/resources?tab=humanities-u`, { replace: true });
    }
  }, [navigate, location.search]);
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <section className="pt-20 pb-8 md:pt-36 md:pb-12">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <Tabs 
              defaultValue={getTabFromURL()} 
              value={getTabFromURL()}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="mb-6 w-full justify-start">
                <TabsTrigger value="humanities-u">Humanities Last Chance U</TabsTrigger>
                <TabsTrigger value="general">Other Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="humanities-u" className="focus-visible:outline-none focus-visible:ring-0">
                <HumanitiesLastChanceU />
              </TabsContent>
              
              <TabsContent value="general" className="focus-visible:outline-none focus-visible:ring-0">
                <OtherResources />
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
