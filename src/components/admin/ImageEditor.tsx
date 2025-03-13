
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Object as FabricObject } from 'fabric';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Save } from 'lucide-react';

// Import our new components
import ImageEditorToolbar from './image-editor/ImageEditorToolbar';
import ImageEditorCanvas from './image-editor/ImageEditorCanvas';
import ZoomControl from './image-editor/ZoomControl';

// Import utility functions
import { createCropRect, applyCropToImage, loadImageOntoCanvas, getCanvasImageData } from '@/lib/utils/imageEditUtils';

interface ImageEditorProps {
  image: string;
  onSave: (editedImage: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image, onSave, isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<FabricCanvas | null>(null);
  const [tool, setTool] = useState<'move' | 'crop'>('move');
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isCropping, setIsCropping] = useState(false);
  const [cropRect, setCropRect] = useState<FabricObject | null>(null);

  // Initialize canvas when dialog opens
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    
    // Clean up any existing canvas
    if (canvas) {
      canvas.dispose();
    }
    
    // Create new canvas
    const fabricCanvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 500,
      backgroundColor: '#f0f0f0',
      preserveObjectStacking: true,
    });
    
    // Load the image onto the canvas
    loadImageOntoCanvas(fabricCanvas, image);
    
    setCanvas(fabricCanvas);
    
    return () => {
      fabricCanvas.dispose();
      setCanvas(null);
      setTool('move');
      setZoom(100);
      setRotation(0);
      setIsCropping(false);
      setCropRect(null);
    };
  }, [isOpen, image]);

  // Handle zoom changes
  useEffect(() => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    
    const zoomFactor = zoom / 100;
    activeObject.scale(zoomFactor);
    canvas.renderAll();
  }, [zoom, canvas]);

  // Handle rotation changes
  useEffect(() => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    
    activeObject.rotate(rotation);
    canvas.renderAll();
  }, [rotation, canvas]);

  // Handle tool changes
  const handleToolChange = (newTool: 'move' | 'crop') => {
    setTool(newTool);
    if (newTool === 'crop') {
      startCrop();
    }
  };

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

  // Zoom controls
  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 10));
  
  // Rotation controls
  const handleRotateLeft = () => setRotation(rotation - 90);
  const handleRotateRight = () => setRotation(rotation + 90);

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
        
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-[auto_1fr] gap-4 h-full">
            {/* Toolbar */}
            <ImageEditorToolbar 
              tool={tool}
              onToolChange={handleToolChange}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onRotateLeft={handleRotateLeft}
              onRotateRight={handleRotateRight}
            />
            
            {/* Canvas area */}
            <ImageEditorCanvas 
              canvasRef={canvasRef}
              isCropping={isCropping}
              onCropApply={applyCrop}
              onCropCancel={cancelCrop}
            />
          </div>
        </div>
        
        {/* Controls */}
        <div className="space-y-4 pt-4 border-t">
          <ZoomControl zoom={zoom} onZoomChange={setZoom} />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageEditor;
