
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Upload, X } from 'lucide-react';
import { ImagePreviewProps } from './types';

const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  onEditRequest,
  onChangeRequest,
  onRemoveRequest
}) => {
  return (
    <div className="space-y-2">
      <div className="relative w-full h-32 mx-auto">
        <img 
          src={image} 
          alt="Article preview" 
          className="rounded-md w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onEditRequest}>
          <Edit2 className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onChangeRequest}>
          <Upload className="w-4 h-4 mr-2" />
          Change
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={onRemoveRequest}
        >
          <X className="w-4 h-4 mr-2" />
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;
