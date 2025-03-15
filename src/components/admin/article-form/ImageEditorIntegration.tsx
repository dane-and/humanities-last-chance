
import React from 'react';
import ImageEditor from '../ImageEditor';

interface ImageEditorIntegrationProps {
  image: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedImage: string) => void;
}

const ImageEditorIntegration: React.FC<ImageEditorIntegrationProps> = ({
  image,
  isOpen,
  onClose,
  onSave
}) => {
  return (
    isOpen && (
      <ImageEditor
        image={image}
        onSave={onSave}
        isOpen={isOpen}
        onClose={onClose}
      />
    )
  );
};

export default ImageEditorIntegration;
