
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { processArticleImage } from '@/lib/utils/imageProcessor';

export const useImageUpload = (onImageChange: (image: string) => void) => {
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
      toast.error('The file must be an image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result) {
        try {
          // Show loading toast
          const loadingToast = toast.loading('Processing image...');
          
          // Process the image to ensure it fits the target dimensions
          const originalImage = e.target.result as string;
          const processedImage = await processArticleImage(originalImage);
          
          // Update the state with the processed image
          onImageChange(processedImage);
          
          // Close loading toast and show success message
          toast.dismiss(loadingToast);
          toast.success('Image processed and uploaded successfully.');
        } catch (error) {
          console.error('Failed to process image:', error);
          toast.error('Failed to process image. Please try again.');
        }
      }
    };
    
    reader.onerror = () => {
      toast.error('Failed to read image file.');
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
