
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

// Create a constant flag to prevent accidental deletion of this component
// This can be checked by other components or build processes
export const FOOTER_COMPONENT_REQUIRED = true;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Log navigation attempt to admin page for debugging
  const handleAdminLinkClick = () => {
    console.log('Footer: Admin link clicked, navigating to /admin');
  };

  return (
    <footer className="bg-gray-100 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Column 1: Logo, Description and X link */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/71dce2e5-1d5f-4477-89d1-7e18ea84e7f2.png" 
                alt="Humanities Last Chance Logo" 
                className="h-10 w-auto"
                loading="lazy"
                width="40"
                height="40"
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
                  <li>
                    <Link 
                      to="/admin" 
                      className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                      onClick={handleAdminLinkClick}
                    >
                      Admin
                      <ExternalLink size={14} className="ml-1" />
                    </Link>
                  </li>
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
