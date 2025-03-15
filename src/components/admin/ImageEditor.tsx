
import React, { useRef, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { getCanvasImageData } from '@/lib/utils/imageEditUtils';

// Import our custom hooks
import { useCanvas } from '@/lib/utils/imageEditor/useCanvas';
import { useTransformations } from '@/lib/utils/imageEditor/useTransformations';
import { useCrop } from '@/lib/utils/imageEditor/useCrop';

// Import our layout component
import ImageEditorLayout from './image-editor/ImageEditorLayout';

interface ImageEditorProps {
  image: string;
  onSave: (editedImage: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image, onSave, isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = React.useState<'move' | 'crop'>('move');

  // Use our custom hooks
  const { canvas, imageLoaded } = useCanvas(canvasRef, image, isOpen);
  
  const {
    zoom, setZoom,
    rotation, setRotation,
    handleZoomIn, handleZoomOut,
    handleRotateLeft, handleRotateRight
  } = useTransformations(canvas);
  
  const {
    isCropping, 
    startCrop, 
    applyCrop, 
    cancelCrop
  } = useCrop(canvas, image);

  // Debug image loading
  useEffect(() => {
    console.log('ImageEditor: Image URL =', image);
    console.log('ImageEditor: Is canvas ready =', !!canvas);
    console.log('ImageEditor: Image loaded =', imageLoaded);
  }, [image, canvas, imageLoaded]);

  // Handle tool changes
  const handleToolChange = (newTool: 'move' | 'crop') => {
    setTool(newTool);
    if (newTool === 'crop') {
      startCrop();
    }
  };

  // Final save
  const handleSave = () => {
    if (!canvas) return;
    
    // Get the image with the applied transformations
    const dataURL = getCanvasImageData(canvas);
    
    onSave(dataURL);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <ImageEditorLayout
        onClose={onClose}
        onSave={handleSave}
        tool={tool}
        onToolChange={handleToolChange}
        canvasRef={canvasRef}
        isCropping={isCropping}
        onCropApply={applyCrop}
        onCropCancel={cancelCrop}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRotateLeft={handleRotateLeft}
        onRotateRight={handleRotateRight}
        zoom={zoom}
        onZoomChange={setZoom}
      />
    </Dialog>
  );
};

export default ImageEditor;
