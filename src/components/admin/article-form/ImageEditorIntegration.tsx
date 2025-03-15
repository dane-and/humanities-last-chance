
import React from 'react';
import ImageEditor from '../ImageEditor';

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
  
  return (
    <ImageEditor
      image={image}
      onSave={onSave}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default ImageEditorIntegration;
