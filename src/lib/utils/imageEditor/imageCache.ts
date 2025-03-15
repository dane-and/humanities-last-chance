
/**
 * Image caching utility for faster image loading
 */

const imageCache = new Map<string, HTMLImageElement>();

/**
 * Preload an image to improve loading time
 */
export const preloadImage = (imageUrl: string): Promise<HTMLImageElement> => {
  if (imageCache.has(imageUrl)) {
    return Promise.resolve(imageCache.get(imageUrl)!);
  }
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      imageCache.set(imageUrl, img);
      resolve(img);
    };
    
    img.onerror = (err) => {
      reject(err);
    };
    
    img.src = imageUrl;
  });
};

/**
 * Get an image from cache or null if not found
 */
export const getImageFromCache = (imageUrl: string): HTMLImageElement | null => {
  return imageCache.get(imageUrl) || null;
};

/**
 * Clear the image cache
 */
export const clearImageCache = (): void => {
  imageCache.clear();
};
