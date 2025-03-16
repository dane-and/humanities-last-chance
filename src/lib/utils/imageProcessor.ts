
/**
 * Image processing utilities for article images
 */

// Target dimensions for article images
const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 800;

/**
 * Process an image to fit within target dimensions while maintaining aspect ratio
 * and adding a blurred background for aesthetic filling of empty space
 * 
 * @param imageDataUrl The original image as a data URL
 * @returns A promise that resolves to the processed image as a data URL
 */
export const processArticleImage = (imageDataUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create an image element to load the original image
    const img = new Image();
    img.onload = () => {
      try {
        // Get original dimensions
        const originalWidth = img.width;
        const originalHeight = img.height;
        
        // If image is already exactly the target size, return it as is
        if (originalWidth === TARGET_WIDTH && originalHeight === TARGET_HEIGHT) {
          resolve(imageDataUrl);
          return;
        }
        
        // Calculate the scaling factor to fit within target dimensions
        // while maintaining aspect ratio
        const scaleFactor = Math.min(
          TARGET_WIDTH / originalWidth,
          TARGET_HEIGHT / originalHeight
        );
        
        // Calculate new dimensions after scaling
        const scaledWidth = Math.round(originalWidth * scaleFactor);
        const scaledHeight = Math.round(originalHeight * scaleFactor);
        
        // Create canvas for the blurred background (target size)
        const backgroundCanvas = document.createElement('canvas');
        backgroundCanvas.width = TARGET_WIDTH;
        backgroundCanvas.height = TARGET_HEIGHT;
        const bgCtx = backgroundCanvas.getContext('2d');
        
        if (!bgCtx) {
          reject(new Error('Failed to get background canvas context'));
          return;
        }
        
        // Draw the image enlarged and blurred for background
        // Scale it to cover the entire target area
        const bgScaleFactor = Math.max(
          TARGET_WIDTH / originalWidth,
          TARGET_HEIGHT / originalHeight
        ) * 1.2; // Scale up a bit more to ensure full coverage
        
        const bgWidth = originalWidth * bgScaleFactor;
        const bgHeight = originalHeight * bgScaleFactor;
        
        // Center the background image
        const bgX = (TARGET_WIDTH - bgWidth) / 2;
        const bgY = (TARGET_HEIGHT - bgHeight) / 2;
        
        // Draw the enlarged image
        bgCtx.drawImage(img, bgX, bgY, bgWidth, bgHeight);
        
        // Apply blur effect
        bgCtx.filter = 'blur(30px) brightness(0.8)';
        bgCtx.drawImage(backgroundCanvas, 0, 0);
        
        // Reset filter for the foreground image
        bgCtx.filter = 'none';
        
        // Calculate position to center the scaled image
        const x = (TARGET_WIDTH - scaledWidth) / 2;
        const y = (TARGET_HEIGHT - scaledHeight) / 2;
        
        // Draw the properly scaled image on top
        bgCtx.drawImage(img, x, y, scaledWidth, scaledHeight);
        
        // Get the final processed image as data URL
        const processedImageDataUrl = backgroundCanvas.toDataURL('image/jpeg', 0.92);
        resolve(processedImageDataUrl);
      } catch (error) {
        console.error('Error processing image:', error);
        reject(error);
      }
    };
    
    img.onerror = (error) => {
      console.error('Error loading image for processing:', error);
      reject(error);
    };
    
    // Start loading the image
    img.src = imageDataUrl;
  });
};

/**
 * Check if an image needs processing
 * @param imageDataUrl The image data URL to check
 * @returns Promise that resolves to true if processing is needed
 */
export const imageNeedsProcessing = (imageDataUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // Check if the image dimensions match the target dimensions
      resolve(img.width !== TARGET_WIDTH || img.height !== TARGET_HEIGHT);
    };
    img.onerror = () => {
      // If we can't load the image, assume it needs processing
      resolve(true);
    };
    img.src = imageDataUrl;
  });
};
