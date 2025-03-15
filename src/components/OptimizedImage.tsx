
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
  const [retryCount, setRetryCount] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  
  // When the src changes, update the imageUrl
  useEffect(() => {
    if (!src) {
      console.error("Image source is empty or undefined");
      setError(true);
      return;
    }
    
    // Check if src is a relative path that needs the public folder prefix
    if (src.startsWith('/')) {
      console.log(`Processing relative path: ${src}`);
      setImageUrl(src);
    } else {
      setImageUrl(src);
    }
    
    // Reset states when src changes
    setImageLoaded(false);
    setError(false);
  }, [src]);
  
  // Force the image to reload if it fails to load
  const retryLoading = () => {
    if (retryCount < 3) {
      console.log(`Retrying image load for ${imageUrl} (attempt ${retryCount + 1})`);
      setRetryCount(prev => prev + 1);
      setError(false);
      setImageLoaded(false);
    }
  };

  useEffect(() => {
    if (!imageUrl) return;
    
    console.log(`Attempting to load image: ${imageUrl} (attempt ${retryCount + 1})`);
    
    // Preload image
    const img = new Image();
    
    // Add a timestamp to prevent caching issues
    const cacheBuster = `?v=${retryCount}-${new Date().getTime()}`;
    img.src = `${imageUrl}${cacheBuster}`;
    
    img.onload = () => {
      console.log(`Image loaded successfully: ${imageUrl}`);
      setImageLoaded(true);
    };
    
    img.onerror = (e) => {
      console.error(`Error loading image: ${imageUrl}`, e);
      setError(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl, retryCount]);

  // If we have a new image to test, use it
  const testImage = "/lovable-uploads/4a4437f6-55b6-4321-9e6f-5ca0a883ccd9.png";

  return (
    <figure className="relative">
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
      
      {error && (
        <div className={`${className} bg-gray-100 flex flex-col items-center justify-center`} 
             style={{ aspectRatio: '16/9' }}>
          <p className="text-gray-500 mb-2">Image could not be loaded</p>
          <p className="text-xs text-gray-400 mb-2">{imageUrl || 'No image URL provided'}</p>
          <button 
            onClick={retryLoading}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded"
            disabled={retryCount >= 3}
          >
            Retry
          </button>
        </div>
      )}
      
      <img
        src={`${imageUrl}?v=${retryCount}-${new Date().getTime()}`}
        alt={alt}
        className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{ display: error ? 'none' : 'block' }}
        loading="eager"
        onLoad={() => setImageLoaded(true)}
        onError={() => setError(true)}
      />
      
      {caption && imageLoaded && (
        <figcaption className={`text-center text-sm text-muted-foreground mt-2 italic ${captionClassName}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default OptimizedImage;
