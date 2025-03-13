
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crop, ZoomIn, ZoomOut, RotateCcw, RotateCw, Move } from 'lucide-react';

interface ImageEditorToolbarProps {
  tool: 'move' | 'crop';
  onToolChange: (tool: 'move' | 'crop') => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
}

const ImageEditorToolbar: React.FC<ImageEditorToolbarProps> = ({
  tool,
  onToolChange,
  onZoomIn,
  onZoomOut,
  onRotateLeft,
  onRotateRight
}) => {
  return (
    <div className="flex flex-col gap-4 p-2 border-r">
      <Button 
        variant={tool === 'move' ? 'default' : 'outline'} 
        size="icon"
        onClick={() => onToolChange('move')}
        title="Move and resize"
      >
        <Move className="h-4 w-4" />
      </Button>
      
      <Button 
        variant={tool === 'crop' ? 'default' : 'outline'} 
        size="icon"
        onClick={() => onToolChange('crop')}
        title="Crop image"
      >
        <Crop className="h-4 w-4" />
      </Button>
      
      <div className="h-px bg-border w-full my-2" />
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={onZoomOut}
        title="Zoom out"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={onZoomIn}
        title="Zoom in"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      
      <div className="h-px bg-border w-full my-2" />
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={onRotateLeft}
        title="Rotate left"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={onRotateRight}
        title="Rotate right"
      >
        <RotateCw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ImageEditorToolbar;
