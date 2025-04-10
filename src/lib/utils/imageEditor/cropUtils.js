
/**
 * Creates a crop rectangle on the canvas
 */
export const createCropRect = (
  canvas, 
  left = 200, 
  top = 150, 
  width = 300, 
  height = 200
) => {
  const rect = new fabric.Rect({
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
  canvas,
  cropRect,
  originalImage,
  callback
) => {
  // Find the image object on the canvas
  const activeObject = canvas.getObjects().find(obj => 
    obj.type === 'image' || obj.get('type') === 'image'
  );
  
  if (!activeObject) {
    console.error('No image found on canvas');
    return;
  }
  
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
