
import React, { useState, useEffect, useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use a static fallback image
  const fallbackImage = "/lovable-uploads/4a4437f6-55b6-4321-9e6f-5ca0a883ccd9.png";
  
  // Reset loading state when src changes
  useEffect(() => {
    setImageLoaded(false);
    setError(false);
  }, [src]);

  // Set the background image
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--bg-image', `url(${error ? fallbackImage : src})`);
    }
  }, [src, error, fallbackImage]);

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
          className={`${className} bg-gray-200 animate-pulse`} 
          style={{ 
            aspectRatio: `${width}/${height}`,
            width: width ? `${width}px` : '100%',
            maxWidth: '100%',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400">Loading...</span>
          </div>
        </div>
      )}
      
      {/* The actual image or fallback */}
      <div className="article-image-container" ref={containerRef}>
        <img
          src={error ? fallbackImage : src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          className={`article-image ${className} ${imageLoaded || error ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
      </div>
      
      {/* Caption - with improved styling */}
      {caption && (imageLoaded || error) && (
        <figcaption className={`text-center text-sm text-muted-foreground mt-2 italic ${captionClassName}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default OptimizedImage;
