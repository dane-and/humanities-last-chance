
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
  overlay?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  buttonText,
  buttonLink = '/',
  overlay = true,
  className,
  size = 'large',
}) => {
  const sizeClasses = {
    small: 'py-16 md:py-20',
    medium: 'py-24 md:py-32',
    large: 'py-32 md:py-48',
  };
  
  return (
    <section
      className={cn(
        'relative flex items-center justify-center w-full',
        sizeClasses[size],
        className
      )}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : {}
      }
    >
      {backgroundImage && overlay && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      )}
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 
          className={cn(
            "font-serif font-bold tracking-tight", 
            backgroundImage ? "text-white" : "text-primary",
            size === 'small' ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'
          )}
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            className={cn(
              "mt-4 max-w-xl mx-auto",
              backgroundImage ? "text-white/90" : "text-muted-foreground",
              size === 'small' ? 'text-base md:text-lg' : 'text-lg md:text-xl'
            )}
          >
            {subtitle}
          </p>
        )}
        
        {buttonText && (
          <div className="mt-8">
            <Link
              to={buttonLink}
              className={cn(
                "inline-flex items-center px-6 py-3 text-sm font-medium transition-colors",
                backgroundImage
                  ? "bg-white text-primary hover:bg-white/90"
                  : "bg-primary text-white hover:bg-primary/90"
              )}
            >
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
