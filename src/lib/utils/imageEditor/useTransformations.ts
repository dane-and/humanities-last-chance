
import { useState, useEffect } from 'react';
import { Canvas as FabricCanvas } from 'fabric';
import { MIN_ZOOM, MAX_ZOOM, ZOOM_STEP, ROTATION_STEP } from './constants';

export const useTransformations = (canvas: FabricCanvas | null) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  
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

  // Zoom controls
  const handleZoomIn = () => setZoom(Math.min(zoom + ZOOM_STEP, MAX_ZOOM));
  const handleZoomOut = () => setZoom(Math.max(zoom - ZOOM_STEP, MIN_ZOOM));
  
  // Rotation controls
  const handleRotateLeft = () => setRotation(rotation - ROTATION_STEP);
  const handleRotateRight = () => setRotation(rotation + ROTATION_STEP);

  return {
    zoom,
    setZoom,
    rotation,
    setRotation,
    handleZoomIn,
    handleZoomOut,
    handleRotateLeft,
    handleRotateRight
  };
};
