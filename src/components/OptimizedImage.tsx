
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
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // Use a static fallback image
  const fallbackImage = "/lovable-uploads/4a4437f6-55b6-4321-9e6f-5ca0a883ccd9.png";
  
  // Reset loading state when src changes
  useEffect(() => {
    setImageLoaded(false);
    setError(false);
  }, [src]);

  // Set the background image for the blur effect
  useEffect(() => {
    if (imageContainerRef.current) {
      const imageSrc = error ? fallbackImage : src;
      imageContainerRef.current.style.setProperty('--bg-image', `url(${imageSrc})`);
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
            width: '100%',
            maxWidth: '100%',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400">Loading...</span>
          </div>
        </div>
      )}
      
      {/* Image container with blurred background */}
      <div 
        ref={imageContainerRef}
        className="image-container"
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <img
          src={error ? fallbackImage : src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          className={`image-main ${imageLoaded || error ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${className}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      
      {/* Caption - only show when image is loaded or there's an error */}
      {caption && (imageLoaded || error) && (
        <figcaption className={`text-center text-sm text-muted-foreground mt-2 italic ${captionClassName}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default OptimizedImage;
