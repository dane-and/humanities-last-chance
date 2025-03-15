
import React from 'react';
import Navigation from '@/components/Navigation';
import PageTemplate from '@/components/PageTemplate';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Main content area with proper padding to avoid toolbar overlap */}
      <main className="flex-grow pt-24 md:pt-28">
        {/* Centered Image Container - positioned above the content */}
        <div className="flex justify-center mx-auto max-w-3xl px-4 pb-6">
          <div className="w-full">
            <img
              src="/lovable-uploads/579d21dc-2855-4f28-8b61-34b44b735095.png"
              alt="Venice cityscape painting by Turner"
              className="mx-auto rounded-md shadow-md"
            />
            <p className="text-center text-sm text-muted-foreground mt-2 italic">
              The Dogana and Santa Maria della Salute, Venice by J.M.W. Turner
            </p>
          </div>
        </div>
        
        <PageTemplate 
          slug="about"
        />
      </main>
    </div>
  );
};

export default About;
