
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import ImageEditorToolbar from './ImageEditorToolbar';
import ImageEditorCanvas from './ImageEditorCanvas';
import ZoomControl from './ZoomControl';

interface ImageEditorLayoutProps {
  onClose: () => void;
  onSave: () => void;
  tool: 'move' | 'crop';
  onToolChange: (tool: 'move' | 'crop') => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isCropping: boolean;
  onCropApply: () => void;
  onCropCancel: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  zoom: number;
  onZoomChange: (value: number) => void;
}

const ImageEditorLayout: React.FC<ImageEditorLayoutProps> = ({
  onClose,
  onSave,
  tool,
  onToolChange,
  canvasRef,
  isCropping,
  onCropApply,
  onCropCancel,
  onZoomIn,
  onZoomOut,
  onRotateLeft,
  onRotateRight,
  zoom,
  onZoomChange
}) => {
  return (
    <DialogContent className="sm:max-w-[900px] h-[90vh] max-h-[800px] flex flex-col">
      <DialogHeader>
        <DialogTitle>Edit Image</DialogTitle>
      </DialogHeader>
      
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-[auto_1fr] gap-4 h-full">
          {/* Toolbar */}
          <ImageEditorToolbar 
            tool={tool}
            onToolChange={onToolChange}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onRotateLeft={onRotateLeft}
            onRotateRight={onRotateRight}
          />
          
          {/* Canvas area */}
          <ImageEditorCanvas 
            canvasRef={canvasRef}
            isCropping={isCropping}
            onCropApply={onCropApply}
            onCropCancel={onCropCancel}
          />
        </div>
      </div>
      
      {/* Controls */}
      <div className="space-y-4 pt-4 border-t">
        <ZoomControl zoom={zoom} onZoomChange={onZoomChange} />
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save Changes</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ImageEditorLayout;
