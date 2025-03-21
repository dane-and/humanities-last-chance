
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  isOpen: boolean;
  mainNavItems: { name: string; path: string }[];
  dropdownItems: { name: string; path: string }[];
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  mainNavItems,
  dropdownItems,
}) => {
  const location = useLocation();
  
  // Create a modified list for mobile that expands the Resources item
  const getMobileNavItems = () => {
    const items = [...mainNavItems];
    const resourcesIndex = items.findIndex(item => item.name === 'Resources');
    
    if (resourcesIndex !== -1) {
      // Remove the original Resources item
      items.splice(resourcesIndex, 1);
      
      // Add the expanded Resources items
      items.splice(resourcesIndex, 0, 
        { name: 'Humanities Last Chance U', path: '/resources?tab=humanities-u' },
        { name: 'Other Resources', path: '/resources?tab=general' }
      );
    }
    
    return [...items, ...dropdownItems];
  };
  
  return (
    <div
      id="mobile-menu"
      className={cn(
        'fixed top-14 left-0 right-0 md:hidden bg-background/95 backdrop-blur-md border-b shadow-lg z-[101] transition-all duration-200 ease-in-out',
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-10px] opacity-0 pointer-events-none'
      )}
    >
      <div className="px-2 py-3 space-y-1">
        {getMobileNavItems().map((item) => {
          const isActive = item.path.includes('?') 
            ? location.pathname + location.search === item.path
            : location.pathname === item.path;
            
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                'block px-4 py-3 rounded-md text-base font-medium',
                isActive
                  ? 'text-primary bg-secondary/50'
                  : 'text-muted-foreground hover:text-primary hover:bg-secondary/50'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.name}
            </Link>
          );
        })}
        <a
          href="https://x.com/humanitieslc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50"
        >
          <img src="/lovable-uploads/f590c355-5b49-4f27-8bef-541f52d68c3b.png" className="h-5 w-5" alt="X logo" />
          <span>Follow on X</span>
        </a>
      </div>
    </div>
  );
};

export default MobileNavigation;
