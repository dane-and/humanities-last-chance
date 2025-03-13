
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Image as FabricImage, Rect, Object as FabricObject } from 'fabric';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Crop, ZoomIn, ZoomOut, RotateCcw, RotateCw, Move, Save } from 'lucide-react';

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
    
    // Load the image using the correct API for Fabric.js v6
    FabricImage.fromURL(image, {
      onLoad: (img) => {
        // Scale the image to fit within the canvas
        img.scale(0.8);
        img.set({
          selectable: true,
          centeredScaling: true,
        });
        
        // Center the image
        img.center();
        fabricCanvas.add(img);
        fabricCanvas.setActiveObject(img);
        fabricCanvas.renderAll();
      }
    });
    
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

  // Handle cropping
  const startCrop = () => {
    if (!canvas) return;
    
    setIsCropping(true);
    
    // Clear any existing crop rectangle
    if (cropRect) {
      canvas.remove(cropRect);
    }
    
    // Create a new crop rectangle
    const rect = new Rect({
      left: 200,
      top: 150,
      width: 300,
      height: 200,
      fill: 'rgba(0,0,0,0.1)',
      stroke: 'rgba(0,0,0,0.5)',
      strokeWidth: 1,
      strokeDashArray: [5, 5],
      selectable: true,
      hasControls: true,
    });
    
    canvas.add(rect);
    canvas.setActiveObject(rect);
    setCropRect(rect);
    canvas.renderAll();
  };

  const applyCrop = () => {
    if (!canvas || !cropRect) return;
    
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
      htmlImage.src = image;
      
      htmlImage.onload = () => {
        tempCanvas.width = cropWidth;
        tempCanvas.height = cropHeight;
        
        tempContext.translate(-cropX, -cropY);
        tempContext.drawImage(htmlImage, 0, 0);
        
        // Get the cropped image data
        const croppedImage = tempCanvas.toDataURL('image/jpeg');
        
        // Clear the canvas and add the cropped image
        canvas.clear();
        
        FabricImage.fromURL(croppedImage, {
          onLoad: (newImg) => {
            newImg.scaleToWidth(400);
            newImg.center();
            canvas.add(newImg);
            canvas.renderAll();
          }
        });
      };
    }
    
    // Cancel cropping mode
    setIsCropping(false);
    setCropRect(null);
  };
  
  const cancelCrop = () => {
    if (!canvas || !cropRect) return;
    
    canvas.remove(cropRect);
    setCropRect(null);
    setIsCropping(false);
    canvas.renderAll();
  };

  // Final save
  const handleSave = () => {
    if (!canvas) return;
    
    // Get the image with the applied transformations
    const dataURL = canvas.toDataURL({
      format: 'jpeg',
      quality: 0.9,
      multiplier: 1,
    });
    
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
            <div className="flex flex-col gap-4 p-2 border-r">
              <Button 
                variant={tool === 'move' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setTool('move')}
                title="Move and resize"
              >
                <Move className="h-4 w-4" />
              </Button>
              
              <Button 
                variant={tool === 'crop' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => {
                  setTool('crop');
                  startCrop();
                }}
                title="Crop image"
              >
                <Crop className="h-4 w-4" />
              </Button>
              
              <div className="h-px bg-border w-full my-2" />
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setZoom(Math.max(zoom - 10, 10))}
                title="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setZoom(Math.min(zoom + 10, 200))}
                title="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <div className="h-px bg-border w-full my-2" />
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setRotation(rotation - 90)}
                title="Rotate left"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setRotation(rotation + 90)}
                title="Rotate right"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Canvas area */}
            <div className="relative border rounded-md overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <canvas ref={canvasRef} className="max-w-full max-h-full" />
              
              {isCropping && (
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <Button size="sm" onClick={applyCrop}>Apply Crop</Button>
                  <Button size="sm" variant="outline" onClick={cancelCrop}>Cancel</Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Zoom: {zoom}%</span>
            </div>
            <Slider 
              value={[zoom]} 
              min={10} 
              max={200} 
              step={1} 
              onValueChange={(values) => setZoom(values[0])}
            />
          </div>
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
