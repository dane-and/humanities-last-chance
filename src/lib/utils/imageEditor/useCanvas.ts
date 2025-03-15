
import { useEffect, useState, useCallback } from 'react';
import { Canvas, Image } from 'fabric';
import { loadImageOntoCanvas } from './imageLoading';

export const useCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imageUrl: string,
  isOpen: boolean
) => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Initialize the canvas only once when the component mounts
  useEffect(() => {
    if (!canvasRef.current || !isOpen) return;

    console.log('Initializing canvas...');
    
    // Set canvas dimensions to match the container
    const canvasEl = canvasRef.current;
    const container = canvasEl.parentElement;
    
    // Create the canvas with appropriate dimensions
    const fabricCanvas = new Canvas(canvasEl, {
      width: container?.clientWidth || 600,
      height: container?.clientHeight || 400,
      backgroundColor: '#f5f5f5',
      preserveObjectStacking: true,
      // Improve rendering performance
      enableRetinaScaling: false,
      renderOnAddRemove: false,
    });
    
    // Make the canvas responsive with debounced resize handler
    let resizeTimeout: number | null = null;
    const resizeCanvas = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      
      resizeTimeout = window.setTimeout(() => {
        if (container) {
          fabricCanvas.setDimensions({
            width: container.clientWidth,
            height: container.clientHeight,
          });
          fabricCanvas.renderAll();
        }
      }, 100); // Debounce resize events
    };
    
    window.addEventListener('resize', resizeCanvas);
    setCanvas(fabricCanvas);
    
    // Clean up when the component unmounts
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      fabricCanvas.dispose();
    };
  }, [canvasRef, isOpen]);

  // Memoize the loadImage function to prevent unnecessary re-renders
  const loadImage = useCallback(async () => {
    if (!canvas || !imageUrl) return;
    
    console.log('Loading image onto canvas:', imageUrl);
    try {
      await loadImageOntoCanvas(canvas, imageUrl);
      setImageLoaded(true);
    } catch (error) {
      console.error('Failed to load image:', error);
      setImageLoaded(false);
    }
  }, [canvas, imageUrl]);

  // Load the image onto the canvas when it changes
  useEffect(() => {
    if (canvas && imageUrl && isOpen) {
      console.log('Canvas is ready and image URL is provided, attempting to load image');
      // Reset the state before loading a new image
      setImageLoaded(false);
      loadImage();
    }
  }, [canvas, imageUrl, isOpen, loadImage]);

  return { canvas, imageLoaded };
};
