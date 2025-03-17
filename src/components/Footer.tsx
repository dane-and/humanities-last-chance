
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Log navigation attempt to admin page for debugging
  const handleAdminLinkClick = () => {
    console.log('Footer: Admin link clicked, navigating to /admin');
  };

  return (
    <footer className="bg-gray-100 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Humanities Last Chance</h3>
            <p className="text-sm text-gray-600 mt-1">A place for humanities discussion</p>
            <div className="mt-4 flex space-x-4">
              <a 
                href="https://x.com/humanitieslc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links - Site Pages */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-gray-600 hover:text-gray-900">Resources</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Quick Links - Article Categories & Admin */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/articles/blog" className="text-sm text-gray-600 hover:text-gray-900">Blog</Link>
              </li>
              <li>
                <Link to="/articles/interviews" className="text-sm text-gray-600 hover:text-gray-900">Interviews</Link>
              </li>
              <li>
                <Link to="/articles/reviews" className="text-sm text-gray-600 hover:text-gray-900">Reviews</Link>
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
        
        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Humanities Last Chance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
