
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
  width = 800,
  height = 600,
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

    // Preload the image
    const preloadImg = new Image();
    preloadImg.src = src;
    
    // Check if image is already cached
    if (preloadImg.complete) {
      setImageLoaded(true);
    }
  }, [src]);

  const handleImageError = () => {
    console.error(`Error loading image: ${src}`);
    setError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Optimize image loading by adding srcSet for responsive images
  const generateSrcSet = () => {
    if (src.includes('sanity.io') || src.includes('cdn.sanity.io')) {
      // For Sanity images, we can use their image API for responsive sizes
      const baseSrc = src.split('?')[0];
      return `
        ${baseSrc}?w=${width/2}&h=${height/2}&auto=format&q=75 ${width/2}w,
        ${baseSrc}?w=${width}&h=${height}&auto=format&q=80 ${width}w,
        ${baseSrc}?w=${width*1.5}&h=${height*1.5}&auto=format&q=70 ${width*1.5}w
      `;
    }
    return undefined;
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
            height: `${Math.min(200, height)}px`,
          }}
        >
          <span className="text-gray-400">Loading...</span>
        </div>
      )}
      
      {/* Image container with white background - improved responsive behavior */}
      <div className="bg-white w-full flex justify-center p-2 overflow-hidden">
        <img
          src={error ? fallbackImage : src}
          srcSet={!error ? generateSrcSet() : undefined}
          sizes={`(max-width: 768px) 90vw, ${width}px`}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`w-auto h-auto max-w-full object-contain ${imageLoaded || error ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${className}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ 
            maxHeight: `${height}px`,
            aspectRatio: `auto`,
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
