
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/articles/blog' },
    { name: 'Interviews', path: '/articles/interviews' },
    { name: 'Reviews', path: '/articles/reviews' },
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
          <div className="flex-shrink-0 flex items-center gap-2">
            <img 
              src="/lovable-uploads/e658c919-e309-420a-aba2-1cd4af9fd449.png" 
              alt="Humanities Last Chance Logo" 
              className="h-7 w-auto md:h-12"
              loading="eager"
              width="48"
              height="48"
            />
            <Link 
              to="/" 
              className="font-serif text-lg md:text-2xl font-bold tracking-tighter transition-colors hover:text-primary/90"
              aria-label="Humanities Last Chance - Return to homepage"
            >
              <span className="hidden sm:inline">Humanities Last Chance</span>
              <span className="sm:hidden">HLC</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    location.pathname === item.path 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  )}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="ml-6">
              <SearchBar />
            </div>
          </div>
          
          {/* Mobile menu button and search */}
          <div className="flex items-center gap-4 md:hidden">
            <SearchBar className="mr-1" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center p-2 rounded-md bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              {isOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed top-14 left-0 right-0 md:hidden bg-background/95 backdrop-blur-md border-b shadow-lg z-[101] transition-all duration-200 ease-in-out',
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-10px] opacity-0 pointer-events-none'
        )}
      >
        <div className="px-2 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                'block px-4 py-3 rounded-md text-base font-medium',
                location.pathname === item.path
                  ? 'text-primary bg-secondary/50'
                  : 'text-muted-foreground hover:text-primary hover:bg-secondary/50'
              )}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
