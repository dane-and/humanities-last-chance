
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
    <figure className="relative">
      {/* Loading placeholder - only show when not loaded and no error */}
      {!imageLoaded && !error && (
        <div 
          className={`${className} animate-pulse bg-gray-100`} 
          style={{ 
            aspectRatio: `${width}/${height}`,
            width: '100%',
            maxWidth: width + 'px',
            height: 'auto',
            maxHeight: height + 'px',
            margin: '0 auto'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400">Loading...</span>
          </div>
        </div>
      )}
      
      {/* Image container with white background */}
      <div 
        className="bg-white"
        style={{ 
          maxWidth: width + 'px',
          maxHeight: height + 'px',
          margin: '0 auto'
        }}
      >
        <img
          src={error ? fallbackImage : src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          className={`w-auto mx-auto max-w-full max-h-${height} ${imageLoaded || error ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${className}`}
          style={{ maxWidth: '100%', maxHeight: height + 'px', objectFit: 'contain' }}
          onLoad={handleImageLoad}
          onError={handleImageError}
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
