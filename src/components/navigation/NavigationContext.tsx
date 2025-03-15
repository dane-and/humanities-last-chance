
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrolled: boolean;
  mainNavItems: Array<{ name: string; path: string }>;
  dropdownItems: Array<{ name: string; path: string }>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Main navigation items that will always be visible
  const mainNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Interviews', path: '/articles/interviews' },
    { name: 'Reviews', path: '/articles/reviews' },
    { name: 'Resources', path: '/resources' },
  ];
  
  // Items that will go in the dropdown
  const dropdownItems = [
    { name: 'Blog', path: '/articles/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  return (
    <NavigationContext.Provider value={{ isOpen, setIsOpen, scrolled, mainNavItems, dropdownItems }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
