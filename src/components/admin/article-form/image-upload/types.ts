
export interface ImageUploadFieldProps {
  image: string;
  onImageChange: (image: string) => void;
  onEditRequest: () => void;
}

export interface ImagePreviewProps {
  image: string;
  onEditRequest: () => void;
  onChangeRequest: () => void;
  onRemoveRequest: () => void;
}

export interface DragDropAreaProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onUploadClick: () => void;
  children: React.ReactNode;
}

export interface ImageCaptionFieldProps {
  caption: string;
  onCaptionChange: (caption: string) => void;
}
