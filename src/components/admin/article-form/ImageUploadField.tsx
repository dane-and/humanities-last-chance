
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload, Image as ImageIcon, Edit2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadFieldProps {
  image: string;
  onImageChange: (image: string) => void;
  onEditRequest: () => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  image,
  onImageChange,
  onEditRequest,
}) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'The file must be an image.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image size should be less than 5MB.',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageChange(e.target.result as string);
        toast({
          title: 'Success',
          description: 'Image uploaded successfully.',
        });
      }
    };
    reader.onerror = () => {
      toast({
        title: 'Error',
        description: 'Failed to read image file.',
        variant: 'destructive',
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Image</label>
      <div 
        className={`border border-dashed rounded-md p-4 text-center ${isDragging ? 'border-primary bg-primary/5' : 'border-input'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
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
              <Button type="button" variant="outline" size="sm" onClick={handleClickUpload}>
                <Upload className="w-4 h-4 mr-2" />
                Change
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => onImageChange('')}
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex flex-col items-center justify-center gap-2">
              <ImageIcon className="w-10 h-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag & drop an image here or
              </p>
              <Button type="button" variant="secondary" size="sm" onClick={handleClickUpload}>
                Choose file
              </Button>
            </div>
          </div>
        )}
        <input 
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileInputChange}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Max size: 5MB. Recommended dimensions: 1200x800px.
      </p>
    </div>
  );
};

export default ImageUploadField;
