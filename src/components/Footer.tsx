
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/lovable-uploads/e658c919-e309-420a-aba2-1cd4af9fd449.png" 
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
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-8">
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/articles/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/articles/interviews" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Interviews
                    </Link>
                  </li>
                  <li>
                    <Link to="/articles/reviews" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Reviews
                    </Link>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Contact
                    </Link>
                  </li>
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
