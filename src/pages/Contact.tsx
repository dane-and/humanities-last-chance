
import React from 'react';
import PageTemplate from '@/components/PageTemplate';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation is included in PageTemplate */}
      
      {/* Main content area with proper padding to avoid toolbar overlap */}
      <main className="flex-grow pt-24 md:pt-28">
        {/* Centered Image Container - positioned above the content */}
        <div className="flex justify-center mx-auto max-w-3xl px-4 pb-6">
          <div className="w-full">
            <img
              src="/lovable-uploads/f26a3192-be99-49a7-ba1e-de7b29518b47.png"
              alt="Scholar writing in manuscript"
              className="mx-auto rounded-md shadow-md"
            />
            <p className="text-center text-sm text-muted-foreground mt-2 italic">
              A medieval scholar at work
            </p>
          </div>
        </div>
        
        {/* Page content from PageTemplate */}
        <PageTemplate 
          slug="contact"
        />
      </main>
    </div>
  );
};

export default Contact;
