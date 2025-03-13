
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Divide links into two balanced columns
  const column1Links = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/articles/blog' },
    { name: 'Interviews', path: '/articles/interviews' },
    { name: 'Reviews', path: '/articles/reviews' },
  ];
  
  const column2Links = [
    { name: 'Resources', path: '/resources' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  return (
    <footer className="border-t bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/site-favicon-512x512.png" 
                  alt="Humanities Last Chance Logo" 
                  className="h-12 w-auto"
                />
                <span className="font-serif text-xl font-bold tracking-tighter">
                  Humanities Last Chance
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                A digital magazine publishing daily blog posts, interviews, and reviews 
                about humanities scholarship.
              </p>
              <div className="mt-4">
                <a 
                  href="https://x.com/humanitieslc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Follow us on X"
                >
                  <img 
                    src="/lovable-uploads/f590c355-5b49-4f27-8bef-541f52d68c3b.png" 
                    alt="X logo" 
                    className="h-5 w-5" 
                  />
                  <span>@humanitieslc</span>
                </a>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-8">
                <ul className="space-y-2">
                  {column1Links.slice(0, 2).map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  {column2Links.slice(0, 2).map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {column1Links.slice(2).map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  {column2Links.slice(2).map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/40">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Humanities Last Chance. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
