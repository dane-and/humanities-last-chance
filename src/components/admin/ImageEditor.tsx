
import React, { useRef, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getCanvasImageData, preloadImage } from '@/lib/utils/imageEditor';
import { Loader2 } from 'lucide-react';

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
  const [tool, setTool] = useState<'move' | 'crop'>('move');
  const [isLoading, setIsLoading] = useState(true);

  // Preload the image when component mounts or image changes
  useEffect(() => {
    if (image && isOpen) {
      preloadImage(image).catch(err => console.error('Failed to preload image:', err));
    }
  }, [image, isOpen]);

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

  // Update loading state when image is loaded
  useEffect(() => {
    if (imageLoaded) {
      setIsLoading(false);
    }
  }, [imageLoaded]);

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
      <DialogContent className="sm:max-w-[900px] h-[90vh] max-h-[800px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading image editor...</p>
            </div>
          </div>
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageEditor;
