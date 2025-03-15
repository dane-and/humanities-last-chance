
import { Canvas as FabricCanvas, Image as FabricImage } from 'fabric';
import { getImageFromCache, preloadImage } from './imageCache';
import { IMAGE_QUALITY, MAX_CANVAS_DIMENSION, ENABLE_IMAGE_CACHING } from './constants';

/**
 * Helper function to handle the image after it's loaded
 */
const handleImageAfterLoad = (
  canvas: FabricCanvas,
  fabricImage: FabricImage,
  scale: number
) => {
  canvas.renderOnAddRemove = false;
  
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  const imgWidth = fabricImage.width || 0;
  const imgHeight = fabricImage.height || 0;
  
  let scaleFactor = scale;
  if (imgWidth > canvasWidth || imgHeight > canvasHeight) {
    const scaleX = (canvasWidth * 0.8) / imgWidth;
    const scaleY = (canvasHeight * 0.8) / imgHeight;
    scaleFactor = Math.min(scaleX, scaleY);
  }
  
  fabricImage.scale(scaleFactor);
  
  fabricImage.set({
    left: (canvasWidth - fabricImage.getScaledWidth()) / 2,
    top: (canvasHeight - fabricImage.getScaledHeight()) / 2,
    selectable: true,
    centeredScaling: true,
  });
  
  canvas.add(fabricImage);
  canvas.setActiveObject(fabricImage);
  
  canvas.renderOnAddRemove = true;
  canvas.renderAll();
  
  console.log('Image successfully added to canvas');
};

/**
 * Show error message on canvas when image loading fails
 */
const showErrorMessage = (canvas: FabricCanvas) => {
  const text = new FabricImage.Text('Image could not be loaded', {
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2,
    originX: 'center',
    originY: 'center',
    fill: 'red'
  });
  canvas.add(text);
  canvas.renderAll();
};

/**
 * Load an image onto a Fabric canvas with optimized processing
 */
export const loadImageOntoCanvas = (
  canvas: FabricCanvas, 
  imageUrl: string, 
  scale: number = 0.8
): Promise<void> => {
  return new Promise((resolve, reject) => {
    canvas.clear();
    canvas.renderAll();
    
    console.log('Attempting to load image:', imageUrl);
    
    const loadImageFromDataURL = (dataUrl: string) => {
      FabricImage.fromURL(dataUrl)
        .then((fabricImage) => {
          console.log('Fabric image created successfully');
          handleImageAfterLoad(canvas, fabricImage, scale);
          resolve();
        })
        .catch(err => {
          console.error('Error creating Fabric image:', err);
          showErrorMessage(canvas);
          reject(err);
        });
    };
    
    if (imageUrl.startsWith('data:')) {
      console.log('Loading data URL image');
      loadImageFromDataURL(imageUrl);
    } else {
      if (ENABLE_IMAGE_CACHING && getImageFromCache(imageUrl)) {
        console.log('Using cached image');
        const img = getImageFromCache(imageUrl)!;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        const ctx = tempCanvas.getContext('2d');
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = tempCanvas.toDataURL('image/jpeg', IMAGE_QUALITY);
          loadImageFromDataURL(dataUrl);
        } else {
          reject(new Error('Could not get 2D context'));
        }
      } else {
        console.log('Loading new image');
        preloadImage(imageUrl)
          .then(img => {
            console.log('HTML Image loaded, creating data URL');
            
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = Math.min(img.width, MAX_CANVAS_DIMENSION);
            tempCanvas.height = Math.min(img.height, MAX_CANVAS_DIMENSION);
            const ctx = tempCanvas.getContext('2d');
            
            if (ctx) {
              ctx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
              const dataUrl = tempCanvas.toDataURL('image/jpeg', IMAGE_QUALITY);
              loadImageFromDataURL(dataUrl);
            } else {
              reject(new Error('Could not get 2D context'));
            }
          })
          .catch(err => {
            console.error('Error loading image:', err);
            showErrorMessage(canvas);
            reject(err);
          });
      }
    }
  });
};

/**
 * Get data URL from canvas with applied transformations
 */
export const getCanvasImageData = (canvas: FabricCanvas): string => {
  return canvas.toDataURL({
    format: 'jpeg',
    quality: IMAGE_QUALITY,
    multiplier: 1,
  });
};
