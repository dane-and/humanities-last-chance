
import { useState, useEffect, RefObject } from 'react';
import { Canvas as FabricCanvas } from 'fabric';
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_BG } from './constants';
import { loadImageOntoCanvas } from '../imageEditUtils';

export const useCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  image: string,
  isOpen: boolean
) => {
  const [canvas, setCanvas] = useState<FabricCanvas | null>(null);
  
  // Initialize canvas when dialog opens
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    
    // Clean up any existing canvas
    if (canvas) {
      canvas.dispose();
    }
    
    // Create new canvas
    const fabricCanvas = new FabricCanvas(canvasRef.current, {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
      backgroundColor: DEFAULT_CANVAS_BG,
      preserveObjectStacking: true,
    });
    
    // Load the image onto the canvas with a proper callback
    if (image) {
      // Small delay to ensure canvas is fully initialized
      setTimeout(() => {
        loadImageOntoCanvas(fabricCanvas, image);
      }, 100);
    }
    
    setCanvas(fabricCanvas);
    
    return () => {
      fabricCanvas.dispose();
      setCanvas(null);
    };
  }, [isOpen, image, canvasRef]);

  return { canvas, setCanvas };
};
