
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';
import CaptionedImage from '@/components/CaptionedImage';

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
              src="/lovable-uploads/f2ebe847-98d2-47f7-89c1-ee9c3175918f.png"
              alt="The Wedding at Cana by Paolo Veronese"
              className="mx-auto rounded-md shadow-md"
              caption="Paolo Veronese, The Wedding at Cana, 1563"
              width={1200}
              height={900}
            />
          </div>
        </div>
        
        <section className="py-4 md:py-6">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <div className="prose max-w-none">
              <h1 className="text-3xl font-bold mb-6">About Humanities Last Chance</h1>
              <p>Humanities Last Chance is a free digital platform and resource dedicated to connecting curious people of all backgrounds to academic humanities scholarship. Based in Washington D.C., our mission is to demonstrate the enduring value and relevance of the liberal arts in today's world.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Why "Humanities Last Chance"?</h2>
              <p>Our name reflects two critical realities. First, the humanities face significant challenges today. These include funding cuts, declining enrollments, and the public's widespread view that humanities departments are irredeemably tainted with political bias.</p>
              
              <p>But more importantly, the humanities remain what they have always been: an essential arena for inquiry into life's ultimate questions. They offer us the space to explore how we should live, what we should believe, and who we should aspire to become. In this sense, the humanities represent our "last chance" for establishing meaningful principles as we collectively shape the world around us.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Our Purpose</h2>
              <p>We believe the humanities offer essential perspectives and tools for understanding ourselves and others. Through our platform, we aim to:</p>
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
              
              {/* "Who 'We' Are" section with reduced vertical spacing and image below text */}
              <div className="mt-4">
                <h2 className="text-2xl font-bold mb-4">Who 'We' Are</h2>
                <div className="flex flex-col">
                  <div>
                    <p>Dane Anderson founded Humanities Last Chance as a platform to push his pet theories, of which there are enough to fill a veterinary, and to use as a prop to interview people he would want to talk to anyway. Unless marked as a guest post, all blog posts, reviews, and interviews are written by Dane, with the help of his research assistant and personal gentleman's gentleman, Jeeves.</p>
                    <p className="mt-3 mb-4">You can reach Dane anytime at <a href="mailto:dane.anderson@humanitieslastchance.org">dane.anderson@humanitieslastchance.org</a>. Although he's a PhD candidate at the University of Michigan, Dane currently lives in the D.C. metro area and would be happy to meet if you're ever passing through.</p>
                  </div>
                  
                  {/* Image positioned below text on all screen sizes */}
                  <div className="flex justify-center">
                    <OptimizedImage
                      src="/lovable-uploads/d2a073af-c735-4eba-b68f-8747596ab32c.png"
                      alt="Dane Anderson pointing at a street sign for Rue Edward-Gibbon"
                      className="w-11/12 md:w-10/12 lg:w-9/12 rounded-md shadow-md"
                      caption="Dane having completed his search for vestiges of Edward Gibbon's residence in Lausanne, Switzerland"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
