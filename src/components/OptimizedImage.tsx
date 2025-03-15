
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
  
  // Use a static fallback image
  const fallbackImage = "/lovable-uploads/4a4437f6-55b6-4321-9e6f-5ca0a883ccd9.png";
  
  // Reset loading state when src changes
  useEffect(() => {
    setImageLoaded(false);
    setError(false);
  }, [src]);

  const handleImageError = () => {
    console.error(`Error loading image: ${src}`);
    setError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <figure className="relative">
      {/* Loading placeholder - only show when not loaded and no error */}
      {!imageLoaded && !error && (
        <div className={`${className} bg-gray-200 animate-pulse`} 
             style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400">Loading...</span>
          </div>
        </div>
      )}
      
      {/* The actual image or fallback */}
      <img
        src={error ? fallbackImage : src}
        alt={alt}
        className={`${className} ${imageLoaded || error ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* Caption */}
      {caption && (imageLoaded || error) && (
        <figcaption className={`text-center text-sm text-muted-foreground mt-2 italic ${captionClassName}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default OptimizedImage;
