
import React from 'react';
import { Link } from 'react-router-dom';
import { CONTENT_CONFIG } from '@/lib/config';

const NavLogo = () => {
  return (
    <div className="flex-shrink-0 flex items-center gap-2">
      <img 
        src="/lovable-uploads/71dce2e5-1d5f-4477-89d1-7e18ea84e7f2.png" 
        alt="Humanities Last Chance Logo" 
        className="h-7 w-auto md:h-12"
        loading="eager"
        width="48"
        height="48"
      />
      <Link 
        to="/" 
        className="font-serif text-lg md:text-2xl font-bold tracking-tighter transition-colors hover:text-primary/90 flex items-center"
        aria-label="Humanities Last Chance - Return to homepage"
      >
        <span className="hidden sm:inline">{CONTENT_CONFIG.SITE_NAME}</span>
        <span className="sm:hidden flex items-center">HLC</span>
      </Link>
    </div>
  );
};

export default NavLogo;
