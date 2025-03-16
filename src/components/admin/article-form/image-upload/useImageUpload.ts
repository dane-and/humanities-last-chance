
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useImageUpload = (onImageChange: (image: string) => void) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [caption, setCaption] = useState('');
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

  return {
    isDragging,
    caption,
    fileInputRef,
    setCaption,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleClickUpload,
    handleFileInputChange
  };
};
