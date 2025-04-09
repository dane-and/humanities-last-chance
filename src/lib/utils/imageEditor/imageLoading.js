
import { getImageFromCache, preloadImage } from './imageCache';
import { DEFAULT_ZOOM } from './constants';

/**
 * Load an image onto a Fabric canvas and center it
 */
export const loadImageOntoCanvas = async (
  canvas,
  imageUrl,
  zoomLevel = DEFAULT_ZOOM
) => {
  let img;

  // First, check cache for the image
  const cachedImage = getImageFromCache(imageUrl);
  if (cachedImage) {
    img = cachedImage;
  } else {
    // If not in cache, load it
    try {
      img = await preloadImage(imageUrl);
    } catch (error) {
      console.error('Error loading image:', error);
      throw error;
    }
  }

  // Create Fabric image object
  return new Promise((resolve, reject) => {
    // Load the image into a fabric object
    fabric.Image.fromURL(imageUrl, (fabricImg) => {
      if (!fabricImg) {
        reject(new Error('Failed to create Fabric image'));
        return;
      }

      // Clear the canvas
      canvas.clear();

      // Scale the image appropriately 
      const containerWidth = canvas.getWidth();
      const containerHeight = canvas.getHeight();
      
      // Calculate the max dimensions to fit in the container
      const scale = Math.min(
        containerWidth / fabricImg.width, 
        containerHeight / fabricImg.height
      ) * (zoomLevel / 100); // Convert to proper scale factor
      
      // Apply scaling
      fabricImg.scale(scale);
      
      // Center the image
      fabricImg.set({
        left: containerWidth / 2,
        top: containerHeight / 2,
        originX: 'center',
        originY: 'center',
      });

      // Add image to canvas
      canvas.add(fabricImg);
      canvas.setActiveObject(fabricImg);
      canvas.renderAll();
      
      resolve(fabricImg);
    }, {
      crossOrigin: 'anonymous'
    });
  });
};

/**
 * Add a watermark or text to the image
 */
export const addTextToImage = (
  canvas, 
  text, 
  position = { x: 10, y: 10 }
) => {
  const textObj = new fabric.Text(text, {
    left: position.x,
    top: position.y,
    fontSize: 20,
    fill: 'rgba(255,255,255,0.8)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 5
  });
  
  canvas.add(textObj);
  canvas.renderAll();
};
