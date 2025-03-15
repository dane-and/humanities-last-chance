
import { Canvas as FabricCanvas, Image as FabricImage, Rect, Object as FabricObject, Text } from 'fabric';

/**
 * Creates a crop rectangle on the canvas
 */
export const createCropRect = (
  canvas: FabricCanvas, 
  left: number = 200, 
  top: number = 150, 
  width: number = 300, 
  height: number = 200
): FabricObject => {
  const rect = new Rect({
    left,
    top,
    width,
    height,
    fill: 'rgba(0,0,0,0.1)',
    stroke: 'rgba(0,0,0,0.5)',
    strokeWidth: 1,
    strokeDashArray: [5, 5],
    selectable: true,
    hasControls: true,
  });
  
  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.renderAll();
  
  return rect;
};

/**
 * Applies cropping to an image based on the crop rectangle
 */
export const applyCropToImage = (
  canvas: FabricCanvas,
  cropRect: FabricObject,
  originalImage: string,
  callback: (croppedImage: string) => void
): void => {
  const activeObject = canvas.getObjects().find(obj => obj instanceof FabricImage);
  if (!activeObject) return;
  
  // Convert objects to plain objects to access properties
  const crop = cropRect.toObject();
  const img = activeObject.toObject();
  
  // Calculate the actual crop dimensions relative to the image
  const cropX = (crop.left - img.left) / (img.scaleX || 1);
  const cropY = (crop.top - img.top) / (img.scaleY || 1);
  const cropWidth = crop.width / (img.scaleX || 1);
  const cropHeight = crop.height / (img.scaleY || 1);
  
  // Apply crop by rendering to a temp canvas
  const tempCanvas = document.createElement('canvas');
  const tempContext = tempCanvas.getContext('2d');
  
  if (tempContext) {
    const htmlImage = new window.Image();
    htmlImage.src = originalImage;
    
    htmlImage.onload = () => {
      tempCanvas.width = cropWidth;
      tempCanvas.height = cropHeight;
      
      tempContext.translate(-cropX, -cropY);
      tempContext.drawImage(htmlImage, 0, 0);
      
      // Get the cropped image data
      const croppedImage = tempCanvas.toDataURL('image/jpeg');
      callback(croppedImage);
    };
  }
};

/**
 * Load an image onto a Fabric canvas
 */
export const loadImageOntoCanvas = (
  canvas: FabricCanvas, 
  imageUrl: string, 
  scale: number = 0.8
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Clear the canvas first
    canvas.clear();
    
    // Create an HTML image first to handle potential CORS issues
    const img = new Image();
    
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      console.log('HTML Image loaded, creating Fabric image now');
      
      // In Fabric.js v6, fromURL takes the URL as first parameter and options object as second parameter
      FabricImage.fromURL(imageUrl, {
        crossOrigin: 'anonymous',
      }).then((fabricImage) => {
        console.log('Fabric image loaded successfully:', fabricImage);
        
        // Scale the image to fit within the canvas
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const imgWidth = fabricImage.width || 0;
        const imgHeight = fabricImage.height || 0;
        
        console.log('Canvas dimensions:', canvasWidth, canvasHeight);
        console.log('Image dimensions:', imgWidth, imgHeight);
        
        // Calculate scale to fit the canvas while preserving aspect ratio
        let scaleFactor = scale;
        if (imgWidth > canvasWidth || imgHeight > canvasHeight) {
          const scaleX = (canvasWidth * 0.8) / imgWidth;
          const scaleY = (canvasHeight * 0.8) / imgHeight;
          scaleFactor = Math.min(scaleX, scaleY);
        }
        
        fabricImage.scale(scaleFactor);
        
        // Center the image on the canvas
        fabricImage.set({
          left: (canvasWidth - fabricImage.getScaledWidth()) / 2,
          top: (canvasHeight - fabricImage.getScaledHeight()) / 2,
          selectable: true,
          centeredScaling: true,
        });
        
        canvas.add(fabricImage);
        canvas.setActiveObject(fabricImage);
        canvas.renderAll();
        
        resolve();
      }).catch(err => {
        console.error('Error creating Fabric image:', err);
        reject(err);
      });
    };
    
    img.onerror = (err) => {
      console.error('Error loading image:', err);
      // Add a placeholder or error message to the canvas
      const text = new Text('Image could not be loaded', {
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        originX: 'center',
        originY: 'center',
        fill: 'red'
      });
      canvas.add(text);
      canvas.renderAll();
      reject(err);
    };
    
    img.src = imageUrl;
  });
};

/**
 * Get data URL from canvas with applied transformations
 */
export const getCanvasImageData = (canvas: FabricCanvas): string => {
  return canvas.toDataURL({
    format: 'jpeg',
    quality: 0.9,
    multiplier: 1,
  });
};
