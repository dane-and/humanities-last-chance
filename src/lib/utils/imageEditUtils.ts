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
  
  const crop = cropRect.toObject();
  const img = activeObject.toObject();
  
  const cropX = (crop.left - img.left) / (img.scaleX || 1);
  const cropY = (crop.top - img.top) / (img.scaleY || 1);
  const cropWidth = crop.width / (img.scaleX || 1);
  const cropHeight = crop.height / (img.scaleY || 1);
  
  const tempCanvas = document.createElement('canvas');
  const tempContext = tempCanvas.getContext('2d');
  
  if (tempContext) {
    const htmlImage = new window.Image();
    htmlImage.crossOrigin = 'anonymous';
    htmlImage.src = originalImage;
    
    htmlImage.onload = () => {
      tempCanvas.width = cropWidth;
      tempCanvas.height = cropHeight;
      
      tempContext.translate(-cropX, -cropY);
      tempContext.drawImage(htmlImage, 0, 0);
      
      const croppedImage = tempCanvas.toDataURL('image/jpeg');
      callback(croppedImage);
    };
  }
};

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
      if (imageCache.has(imageUrl)) {
        console.log('Using cached image');
        const img = imageCache.get(imageUrl)!;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        const ctx = tempCanvas.getContext('2d');
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.9);
          loadImageFromDataURL(dataUrl);
        } else {
          reject(new Error('Could not get 2D context'));
        }
      } else {
        console.log('Loading new image');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          console.log('HTML Image loaded, creating data URL');
          imageCache.set(imageUrl, img);
          
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = img.width;
          tempCanvas.height = img.height;
          const ctx = tempCanvas.getContext('2d');
          
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.9);
            loadImageFromDataURL(dataUrl);
          } else {
            reject(new Error('Could not get 2D context'));
          }
        };
        
        img.onerror = (err) => {
          console.error('Error loading image:', err);
          showErrorMessage(canvas);
          reject(err);
        };
        
        console.log('Setting src for HTML Image:', imageUrl);
        img.src = imageUrl;
      }
    }
  });
};

const showErrorMessage = (canvas: FabricCanvas) => {
  const text = new Text('Image could not be loaded', {
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
 * Get data URL from canvas with applied transformations
 */
export const getCanvasImageData = (canvas: FabricCanvas): string => {
  return canvas.toDataURL({
    format: 'jpeg',
    quality: 0.9,
    multiplier: 1,
  });
};
