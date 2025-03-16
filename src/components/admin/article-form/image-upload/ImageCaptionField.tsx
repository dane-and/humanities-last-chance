
import React from 'react';
import { Input } from '@/components/ui/input';
import { ImageCaptionFieldProps } from './types';

const ImageCaptionField: React.FC<ImageCaptionFieldProps> = ({
  caption,
  onCaptionChange
}) => {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium">Image Caption (optional)</label>
      <Input 
        placeholder="Add a caption for the image"
        value={caption}
        onChange={(e) => onCaptionChange(e.target.value)}
        className="mt-1"
      />
    </div>
  );
};

export default ImageCaptionField;
