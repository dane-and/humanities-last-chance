
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONTENT_CONFIG } from '@/lib/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type NavItem = {
  name: string;
  path: string;
};

interface DesktopNavItemsProps {
  mainNavItems: NavItem[];
  dropdownItems: NavItem[];
}

const DesktopNavItems: React.FC<DesktopNavItemsProps> = ({ mainNavItems, dropdownItems }) => {
  const location = useLocation();
  
  return (
    <div className="flex items-center space-x-8">
      {mainNavItems.map((item) => {
        // Special handling for Resources with dropdown
        if (item.name === 'Resources') {
          return (
            <DropdownMenu key={item.name}>
              <DropdownMenuTrigger className={cn(
                'text-sm font-medium transition-colors hover:text-primary flex items-center',
                location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
              )}>
                <span>Resources</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border w-56">
                <DropdownMenuItem asChild>
                  <Link
                    to="/resources?tab=humanities-u"
                    className={cn(
                      'w-full cursor-pointer',
                      location.pathname === '/resources' && location.search.includes('tab=humanities-u') ? 'text-primary' : ''
                    )}
                  >
                    Humanities Last Chance U
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/resources?tab=general"
                    className={cn(
                      'w-full cursor-pointer',
                      location.pathname === '/resources' && location.search.includes('tab=general') ? 'text-primary' : ''
                    )}
                  >
                    Other Resources
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }
        
        // Regular navigation items
        return (
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
        );
      })}
      
      {/* More Pages Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          <span>More</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border w-40">
          {dropdownItems.map((item) => (
            <DropdownMenuItem key={item.name} asChild>
              <Link
                to={item.path}
                className={cn(
                  'w-full cursor-pointer',
                  location.pathname === item.path ? 'text-primary' : ''
                )}
              >
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <a 
        href={CONTENT_CONFIG.SOCIAL.TWITTER}
        target="_blank" 
        rel="noopener noreferrer"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1"
        aria-label="Follow us on X"
      >
        <img 
          src="/lovable-uploads/f590c355-5b49-4f27-8bef-541f52d68c3b.png" 
          alt="X logo" 
          className="h-4 w-4" 
        />
        <span className="hidden lg:inline">Follow</span>
      </a>
    </div>
  );
};

export default DesktopNavItems;
