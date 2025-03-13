
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface ZoomControlProps {
  zoom: number;
  onZoomChange: (value: number) => void;
}

const ZoomControl: React.FC<ZoomControlProps> = ({ zoom, onZoomChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Zoom: {zoom}%</span>
      </div>
      <Slider 
        value={[zoom]} 
        min={10} 
        max={200} 
        step={1} 
        onValueChange={(values) => onZoomChange(values[0])}
      />
    </div>
  );
};

export default ZoomControl;
