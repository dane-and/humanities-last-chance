
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Log navigation attempt to admin page for debugging
  const handleAdminLinkClick = () => {
    console.log('Footer: Admin link clicked, navigating to /admin');
  };

  return (
    <footer className="bg-gray-100 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-800">Humanities Last Chance</h3>
            <p className="text-sm text-gray-600 mt-1">A place for humanities discussion</p>
          </div>
          
          <div className="space-y-2 md:space-y-0 md:space-x-8 flex flex-col md:flex-row items-center">
            <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link>
            <Link to="/resources" className="text-sm text-gray-600 hover:text-gray-900">Resources</Link>
            <Link 
              to="/admin" 
              className="text-sm text-gray-600 hover:text-gray-900"
              onClick={handleAdminLinkClick}
            >
              Admin
            </Link>
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
