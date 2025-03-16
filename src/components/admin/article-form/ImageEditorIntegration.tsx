
import React, { useEffect, useState } from 'react';
import ImageEditor from '../ImageEditor';
import { processArticleImage } from '@/lib/utils/imageProcessor';
import { toast } from 'sonner';

interface ImageEditorIntegrationProps {
  image: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedImage: string) => void;
}

/**
 * This component integrates the image editor with the article form
 * It serves as a bridge between the ArticleForm and the ImageEditor
 */
const ImageEditorIntegration: React.FC<ImageEditorIntegrationProps> = ({
  image,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen) return null;
  
  const handleSaveImage = async (editedImage: string) => {
    try {
      // Show loading toast
      const loadingToast = toast.loading('Processing edited image...');
      
      // Process the edited image to ensure it fits the target dimensions
      const processedImage = await processArticleImage(editedImage);
      
      // Pass the processed image to the parent component
      onSave(processedImage);
      
      // Close loading toast
      toast.dismiss(loadingToast);
      toast.success('Image edited and processed successfully.');
    } catch (error) {
      console.error('Failed to process edited image:', error);
      toast.error('Failed to process image. Please try again.');
      // Fall back to the unprocessed edited image
      onSave(editedImage);
    }
  };
  
  return (
    <ImageEditor
      image={image}
      onSave={handleSaveImage}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default ImageEditorIntegration;
