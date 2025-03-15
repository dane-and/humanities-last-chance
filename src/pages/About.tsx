
import React from 'react';
import Navigation from '@/components/Navigation';
import PageTemplate from '@/components/PageTemplate';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 md:pt-28">
        <PageTemplate 
          slug="about"
        />
      </main>
    </div>
  );
};

export default About;
