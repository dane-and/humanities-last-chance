
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
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
        
        <section className="py-4 md:py-6">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <div className="prose max-w-none">
              <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
              <p>Thank you for your interest in Humanities Last Chance. We welcome your questions, suggestions, and contributions.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Get in Touch</h2>
              <p>Email: <a href="mailto:dane.anderson@humanitieslastchance.org">dane.anderson@humanitieslastchance.org</a></p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Submissions & Collaborations</h2>
              <p>We're always looking to feature diverse perspectives on the humanities:</p>
              <ul>
                <li><strong>Interview Suggestions:</strong> Know a scholar whose work deserves wider recognition? Let us know.</li>
                <li><strong>Guest Posts:</strong> We welcome thoughtful contributions aligned with our mission.</li>
                <li><strong>Book & Publication Reviews:</strong> Suggest important works for us to review.</li>
                <li><strong>Resource Recommendations:</strong> Help us expand our "Humanities Last Chance U" collection.</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Connect on Social Media</h2>
              <p className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/b14d35fd-37cf-4977-a7c2-76a8d49e6a84.png" 
                  alt="X logo" 
                  className="h-5 w-5" 
                />
                <a href="https://twitter.com/humanitieslc" target="_blank" rel="noopener noreferrer">@humanitieslc</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
