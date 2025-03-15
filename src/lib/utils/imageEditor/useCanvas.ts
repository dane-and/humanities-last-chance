
import { useEffect, useState } from 'react';
import { Canvas, Image } from 'fabric';
import { loadImageOntoCanvas } from '../imageEditUtils';

export const useCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imageUrl: string,
  isOpen: boolean
) => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Initialize the canvas when the component mounts
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
    });
    
    // Make the canvas responsive
    const resizeCanvas = () => {
      if (container) {
        fabricCanvas.setDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
        fabricCanvas.renderAll();
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    setCanvas(fabricCanvas);
    
    // Clean up when the component unmounts
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      fabricCanvas.dispose();
    };
  }, [canvasRef, isOpen]);

  // Load the image onto the canvas when it changes
  useEffect(() => {
    const loadImage = async () => {
      if (!canvas || !imageUrl) return;
      
      console.log('Loading image onto canvas:', imageUrl);
      try {
        await loadImageOntoCanvas(canvas, imageUrl);
        setImageLoaded(true);
      } catch (error) {
        console.error('Failed to load image:', error);
        setImageLoaded(false);
      }
    };
    
    if (canvas && imageUrl && isOpen) {
      console.log('Canvas is ready and image URL is provided, attempting to load image');
      loadImage();
    }
  }, [canvas, imageUrl, isOpen]);

  return { canvas, imageLoaded };
};
