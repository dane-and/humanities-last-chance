
import React from 'react';
import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';
import MobileNavigation from './MobileNavigation';
import { NavigationProvider, useNavigation } from './navigation/NavigationContext';
import NavLogo from './navigation/NavLogo';
import DesktopNavItems from './navigation/DesktopNavItems';
import MobileNavButton from './navigation/MobileNavButton';

const NavigationContent = () => {
  const { isOpen, setIsOpen, scrolled, mainNavItems, dropdownItems } = useNavigation();
  
  return (
    <nav
      className={cn(
        'fixed w-full z-[100] transition-all duration-300',
        scrolled ? 'bg-background/95 backdrop-blur-md border-b' : 'bg-transparent'
      )}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-20">
          {/* Logo and site name */}
          <NavLogo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <DesktopNavItems 
              mainNavItems={mainNavItems}
              dropdownItems={dropdownItems}
            />
            <div className="ml-6">
              <SearchBar />
            </div>
          </div>
          
          {/* Mobile menu button and search */}
          <div className="flex items-center gap-4 md:hidden">
            <SearchBar className="mr-1" />
            <MobileNavButton isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <MobileNavigation 
        isOpen={isOpen}
        mainNavItems={mainNavItems}
        dropdownItems={dropdownItems}
      />
    </nav>
  );
};

const Navigation = () => {
  return (
    <NavigationProvider>
      <NavigationContent />
    </NavigationProvider>
  );
};

export default Navigation;
