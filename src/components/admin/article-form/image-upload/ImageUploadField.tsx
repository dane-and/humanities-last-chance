
import React from 'react';
import { ImageUploadFieldProps } from './types';
import { useImageUpload } from './useImageUpload';
import ImagePreview from './ImagePreview';
import DragDropArea from './DragDropArea';
import UploadPlaceholder from './UploadPlaceholder';
import ImageCaptionField from './ImageCaptionField';

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  image,
  onImageChange,
  onEditRequest,
}) => {
  const {
    isDragging,
    caption,
    fileInputRef,
    setCaption,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleClickUpload,
    handleFileInputChange
  } = useImageUpload(onImageChange);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Image</label>
      <DragDropArea
        isDragging={isDragging}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onUploadClick={image ? undefined : handleClickUpload}
      >
        {image ? (
          <ImagePreview
            image={image}
            onEditRequest={onEditRequest}
            onChangeRequest={handleClickUpload}
            onRemoveRequest={() => onImageChange('')}
          />
        ) : (
          <UploadPlaceholder onClick={handleClickUpload} />
        )}
      </DragDropArea>
      
      <input 
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileInputChange}
      />
      
      <ImageCaptionField
        caption={caption}
        onCaptionChange={setCaption}
      />
      
      <p className="text-xs text-muted-foreground">
        Max size: 5MB. Recommended dimensions: 1200x800px.
      </p>
    </div>
  );
};

export default ImageUploadField;
