
import React, { useEffect, useRef } from 'react';
import { Canvas as FabricCanvas, Object as FabricObject } from 'fabric';
import { Button } from '@/components/ui/button';

interface ImageEditorCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isCropping: boolean;
  onCropApply: () => void;
  onCropCancel: () => void;
}

const ImageEditorCanvas: React.FC<ImageEditorCanvasProps> = ({
  canvasRef,
  isCropping,
  onCropApply,
  onCropCancel
}) => {
  return (
    <div className="relative border rounded-md overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-900 w-full h-full min-h-[400px]">
      <canvas ref={canvasRef} className="max-w-full max-h-full" />
      
      {isCropping && (
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button size="sm" onClick={onCropApply}>Apply Crop</Button>
          <Button size="sm" variant="outline" onClick={onCropCancel}>Cancel</Button>
        </div>
      )}
    </div>
  );
};

export default ImageEditorCanvas;
