
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
  
  // Define a guaranteed fallback image that we know exists
  const fallbackImage = "/lovable-uploads/4a4437f6-55b6-4321-9e6f-5ca0a883ccd9.png";
  
  // Determine which image URL to use
  const imageUrl = error && retryCount >= 2 ? fallbackImage : src;
  
  // When error occurs or retry is triggered
  const retryLoading = () => {
    if (retryCount < 3) {
      console.log(`Retrying image load (attempt ${retryCount + 1})`);
      setRetryCount(prev => prev + 1);
      setError(false);
      setImageLoaded(false);
    }
  };

  // Reset states when source changes
  useEffect(() => {
    if (!src) {
      console.error("Image source is empty or undefined");
      setError(true);
      return;
    }
    
    console.log(`New image source: ${src}`);
    setImageLoaded(false);
    setError(false);
    setRetryCount(0);
  }, [src]);

  // Handle image loading with cache prevention
  useEffect(() => {
    if (!imageUrl) return;
    
    const timestamp = new Date().getTime();
    const nonce = Math.random().toString(36).substring(2, 10);
    const cacheBuster = `?v=${timestamp}-${nonce}-${retryCount}`;
    const fullUrl = `${imageUrl}${cacheBuster}`;
    
    console.log(`Loading image: ${fullUrl}`);
    
    const img = new Image();
    img.src = fullUrl;
    
    img.onload = () => {
      console.log(`✅ Image loaded successfully: ${imageUrl}`);
      setImageLoaded(true);
      setError(false);
    };
    
    img.onerror = (e) => {
      console.error(`❌ Error loading image: ${imageUrl}`, e);
      setError(true);
      
      // Automatically try the fallback on the last retry
      if (retryCount >= 2 && imageUrl !== fallbackImage) {
        console.log("Switching to fallback image");
      }
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl, retryCount]);

  return (
    <figure className="relative">
      {/* Loading spinner */}
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
      
      {/* Error state */}
      {error && (
        <div className={`${className} bg-gray-100 flex flex-col items-center justify-center`} 
             style={{ aspectRatio: '16/9' }}>
          <p className="text-gray-500 mb-2">Image could not be loaded</p>
          <button 
            onClick={retryLoading}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded"
            disabled={retryCount >= 3}
          >
            {retryCount >= 3 ? "Max retries reached" : "Retry"}
          </button>
        </div>
      )}
      
      {/* Actual image */}
      {imageUrl && (
        <img
          src={`${imageUrl}?v=${new Date().getTime()}-${retryCount}`}
          alt={alt}
          className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{ display: error ? 'none' : 'block' }}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          onError={() => setError(true)}
        />
      )}
      
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
