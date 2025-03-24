
import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
  captionClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  caption,
  captionClassName = '',
  width = 1200,
  height = 800,
  priority = false
}) => {
  // If src is empty, don't render anything
  if (!src || src.trim() === '') {
    return null;
  }
  
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
    <figure className="relative w-full flex flex-col items-center">
      {/* Loading placeholder - only show when not loaded and no error */}
      {!imageLoaded && !error && (
        <div 
          className={`bg-gray-100 flex items-center justify-center ${className}`} 
          style={{ 
            width: '100%',
            maxWidth: `${width}px`,
            height: `${Math.min(400, height)}px`,
          }}
        >
          <span className="text-gray-400">Loading...</span>
        </div>
      )}
      
      {/* Image container with white background */}
      <div className="bg-white w-full flex justify-center">
        <img
          src={error ? fallbackImage : src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          className={`max-w-full object-contain ${imageLoaded || error ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${className}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ 
            maxWidth: `${width}px`,
            maxHeight: `${height}px`,
          }}
        />
      </div>
      
      {/* Caption - only show when image is loaded or there's an error */}
      {caption && caption.trim() !== '' && (imageLoaded || error) && (
        <figcaption className={`text-center text-sm text-muted-foreground mt-2 italic ${captionClassName}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default OptimizedImage;
