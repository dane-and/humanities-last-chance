
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PageTemplate 
        slug="contact"
      />
      
      {/* Centered Image Container */}
      <div className="flex justify-center mx-auto max-w-3xl px-4 pb-10 -mt-4">
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
    </div>
  );
};

export default Contact;
