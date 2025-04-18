
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

// Create a constant flag to prevent accidental deletion of this component
// This can be checked by other components or build processes
export const FOOTER_COMPONENT_REQUIRED = true;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Column 1: Logo, Description and X link */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1">
              <img 
                src="/lovable-uploads/25d9abe1-5882-442f-acf4-d37c96268fb4.png" 
                alt="Humanities Last Chance Logo" 
                className="h-12 w-auto"
                loading="lazy"
                width="48"
                height="48"
              />
              <h3 className="text-lg font-semibold text-gray-800">Humanities Last Chance</h3>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              A free online resource publishing blog posts, interviews, and reviews about humanities scholarship.
            </p>
            <div className="mt-4 flex items-center">
              <a 
                href="https://x.com/humanitieslc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
              >
                <img 
                  src="/lovable-uploads/02e16988-f0b5-425b-b7e3-6eb9444b7f05.png" 
                  alt="X logo" 
                  className="h-5 w-auto mr-2"
                  width="20"
                  height="20"
                />
                <span className="text-sm">@humanitieslc</span>
              </a>
            </div>
          </div>
          
          {/* Links Section - using a container to ensure proper alignment */}
          <div className="col-span-2 md:col-span-2">
            <div className="grid grid-cols-2 gap-8">
              {/* Column 2: First link column */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
                  </li>
                  <li>
                    <Link to="/articles/blog" className="text-sm text-gray-600 hover:text-gray-900">Blog</Link>
                  </li>
                  <li>
                    <Link to="/articles/interviews" className="text-sm text-gray-600 hover:text-gray-900">Interviews</Link>
                  </li>
                  <li>
                    <Link to="/articles/reviews" className="text-sm text-gray-600 hover:text-gray-900">Reviews</Link>
                  </li>
                </ul>
              </div>
              
              {/* Column 3: Second link column */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-4 opacity-0">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/resources" className="text-sm text-gray-600 hover:text-gray-900">Resources</Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link>
                  </li>
                  {/* Admin button removed as requested */}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Humanities Last Chance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Add a static property to indicate this component is required
Footer.displayName = 'FooterRequired';

export default Footer;
