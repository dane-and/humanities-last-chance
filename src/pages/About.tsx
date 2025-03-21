
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Main content area with proper padding to avoid toolbar overlap */}
      <main className="flex-grow pt-24 md:pt-28">
        {/* Centered Image Container - positioned above the content */}
        <div className="flex justify-center mx-auto max-w-3xl px-4 pb-6">
          <div className="w-full">
            <OptimizedImage
              src="/lovable-uploads/579d21dc-2855-4f28-8b61-34b44b735095.png"
              alt="Venice cityscape painting by Turner"
              className="mx-auto rounded-md shadow-md"
              caption="J.M.W. Turner, The Dogana and Santa Maria della Salute, 1834"
            />
          </div>
        </div>
        
        <section className="py-4 md:py-6">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <div className="prose max-w-none">
              <h1 className="text-3xl font-bold mb-6">About Humanities Last Chance</h1>
              <p>Humanities Last Chance is a free digital platform and resource dedicated to connecting curious people of all backgrounds to academic humanities scholarship. Based in Washington D.C. but reaching across the English-speaking world, our mission is to demonstrate the enduring value and relevance of the liberal arts in today's world.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Why "Humanities Last Chance"?</h2>
              <p>Our name reflects two critical realities. First, the humanities face significant challenges today—with university funding cuts and a widespread public perception that the academic humanities have become merely the R&D wing of left-wing political movements.</p>
              <p>Yet more importantly, the humanities remain what they have always been: the essential arena for inquiry into life's ultimate questions. They offer us the space to explore how we should live, what we should believe, and who we should aspire to become. In this sense, the humanities represent our "last chance" for establishing meaningful principles as we collectively shape the world around us.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Our Purpose</h2>
              <p>We believe the humanities offer essential perspectives and tools for understanding ourselves and our society. Through our platform, we aim to:</p>
              <ul>
                <li>Showcase the work of humanities scholars to non-specialists</li>
                <li>Demonstrate the practical and intellectual value of liberal arts education</li>
                <li>Provide accessible entry points to various humanities disciplines</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
              <ul>
                <li><strong>Daily Blog Posts:</strong> Accessible explorations of humanities topics and their relevance to contemporary issues</li>
                <li><strong>Weekly Interviews:</strong> Conversations with leading scholars about their research and insights</li>
                <li><strong>Publication Reviews:</strong> Thoughtful analyses of significant works in the humanities</li>
                <li><strong>Humanities Last Chance U:</strong> A curated collection of resources for self-directed learning at all levels</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Connect With Us</h2>
              <p>We're committed to fostering a community of curious minds. Whether you're a student, educator, or simply someone interested in exploring the humanities, we invite you to join our conversation.</p>
              <p><strong>Founder:</strong> Dane Anderson</p>
              <p><strong>Email:</strong> <a href="mailto:dane.anderson@humanitieslastchance.org">dane.anderson@humanitieslastchance.org</a></p>
              <p><strong>Location:</strong> Washington D.C.</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
