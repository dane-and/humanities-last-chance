
import { useState } from 'react';
import { Canvas as FabricCanvas, Object as FabricObject } from 'fabric';
import { createCropRect, applyCropToImage } from './cropUtils';
import { loadImageOntoCanvas } from './imageLoading';

export const useCrop = (canvas: FabricCanvas | null, image: string) => {
  const [isCropping, setIsCropping] = useState(false);
  const [cropRect, setCropRect] = useState<FabricObject | null>(null);

  // Start cropping
  const startCrop = () => {
    if (!canvas) return;
    
    setIsCropping(true);
    
    // Clear any existing crop rectangle
    if (cropRect) {
      canvas.remove(cropRect);
    }
    
    // Create a new crop rectangle
    const rect = createCropRect(canvas);
    setCropRect(rect);
  };

  // Apply crop to the image
  const applyCrop = () => {
    if (!canvas || !cropRect) return;
    
    applyCropToImage(canvas, cropRect, image, (croppedImage) => {
      // Clear the canvas and add the cropped image
      canvas.clear();
      loadImageOntoCanvas(canvas, croppedImage, 1);
    });
    
    // Cancel cropping mode
    setIsCropping(false);
    setCropRect(null);
  };
  
  // Cancel cropping
  const cancelCrop = () => {
    if (!canvas || !cropRect) return;
    
    canvas.remove(cropRect);
    setCropRect(null);
    setIsCropping(false);
    canvas.renderAll();
  };

  return {
    isCropping,
    setIsCropping,
    cropRect,
    setCropRect,
    startCrop,
    applyCrop,
    cancelCrop
  };
};
