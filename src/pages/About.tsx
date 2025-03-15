
import React from 'react';
import PageTemplate from '@/components/PageTemplate';

const About = () => {
  return (
    <PageTemplate 
      slug="about"
      heroImage={{
        src: "/lovable-uploads/6410840d-c1c9-43f2-a153-7cfe45e01e92.png",
        alt: "Turner's Venice painting",
        caption: "J.M.W. Turner's depiction of Venice, ca. 1840"
      }}
    />
  );
};

export default About;
