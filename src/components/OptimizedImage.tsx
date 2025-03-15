
import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
  captionClassName?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  caption,
  captionClassName = ''
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Use a guaranteed fallback image
  const fallbackImage = "/lovable-uploads/4a4437f6-55b6-4321-9e6f-5ca0a883ccd9.png";
  
  // Determine the actual image source to use
  const imageUrl = error ? fallbackImage : src;
  
  // Reset loading state and errors when src changes
  useEffect(() => {
    setImageLoaded(false);
    setError(false);
  }, [src]);

  const handleImageError = () => {
    console.error(`Error loading image: ${src}`);
    setError(true);
  };

  const handleImageLoad = () => {
    console.log(`Image loaded successfully: ${imageUrl}`);
    setImageLoaded(true);
  };

  return (
    <figure className="relative">
      {/* Loading placeholder */}
      {!imageLoaded && !error && (
        <div className={`${className} bg-gray-200 animate-pulse`} 
             style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      )}
      
      {/* The actual image */}
      <img
        src={imageUrl}
        alt={alt}
        className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{ display: 'block' }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* Caption (only shown when image is loaded) */}
      {caption && imageLoaded && (
        <figcaption className={`text-center text-sm text-muted-foreground mt-2 italic ${captionClassName}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default OptimizedImage;
