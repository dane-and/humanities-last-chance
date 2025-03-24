
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';
import NavLogo from './navigation/NavLogo';
import DesktopNavItems from './navigation/DesktopNavItems';
import { CONTENT_CONFIG } from '@/lib/config';
import ExportButton from './ExportButton';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Define navigation items
  const mainNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Articles', path: '/articles/blog' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' }
  ];
  
  const dropdownItems = [
    { name: 'Blog', path: '/articles/blog' },
    { name: 'Interviews', path: '/articles/interviews' },
    { name: 'Reviews', path: '/articles/reviews' }
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLogo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-between space-x-4">
            <DesktopNavItems 
              mainNavItems={mainNavItems}
              dropdownItems={dropdownItems}
            />
          </nav>
          
          {/* Export Button */}
          <div className="hidden md:flex items-center ml-4">
            <ExportButton />
          </div>
          
          {/* Mobile Navigation toggle */}
          <div className="flex md:hidden">
            <MobileNavigation 
              isOpen={isOpen} 
              setIsOpen={setIsOpen} 
              mainNavItems={mainNavItems}
              dropdownItems={dropdownItems}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
