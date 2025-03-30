
import React from 'react';
import { Link } from 'react-router-dom';
import { CONTENT_CONFIG } from '@/lib/config';
import { cn } from '@/lib/utils';

interface NavLogoProps {
  className?: string;
}

const NavLogo: React.FC<NavLogoProps> = ({ className }) => {
  return (
    <div className={cn("flex-shrink-0 flex items-center gap-1", className)}>
      <img 
        src="/lovable-uploads/25d9abe1-5882-442f-acf4-d37c96268fb4.png" 
        alt="Humanities Last Chance Logo" 
        className="h-8 w-auto md:h-14"
        loading="eager"
        width="56"
        height="56"
      />
      <Link 
        to="/" 
        className="font-serif text-lg md:text-2xl font-bold tracking-tighter transition-colors hover:text-primary/90 text-black flex items-center !text-black"
        aria-label="Humanities Last Chance - Return to homepage"
      >
        <span className="hidden sm:inline">{CONTENT_CONFIG.SITE_NAME}</span>
        <span className="sm:hidden flex items-center">HLC</span>
      </Link>
    </div>
  );
};

export default NavLogo;
