
import { Canvas as FabricCanvas, Image as FabricImage, Rect, Object as FabricObject } from 'fabric';

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
): void => {
  // Use the correct Fabric.js v6 API format for loading images
  FabricImage.fromURL(imageUrl).then(img => {
    // Scale the image to fit within the canvas
    img.scale(scale);
    img.set({
      selectable: true,
      centeredScaling: true,
    });
    
    // Center the image on the canvas
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const imgWidth = img.getScaledWidth();
    const imgHeight = img.getScaledHeight();
    
    img.set({
      left: (canvasWidth - imgWidth) / 2,
      top: (canvasHeight - imgHeight) / 2
    });
    
    canvas.add(img);
    canvas.setActiveObject(img);
    canvas.renderAll();
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
