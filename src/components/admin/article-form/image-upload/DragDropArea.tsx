
import React from 'react';
import { DragDropAreaProps } from './types';

const DragDropArea: React.FC<DragDropAreaProps> = ({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onUploadClick,
  children
}) => {
  return (
    <div 
      className={`border border-dashed rounded-md p-4 text-center ${isDragging ? 'border-primary bg-primary/5' : 'border-input'}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onUploadClick}
    >
      {children}
    </div>
  );
};

export default DragDropArea;
