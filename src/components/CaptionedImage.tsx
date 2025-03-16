
import React from 'react';
import OptimizedImage from './OptimizedImage';

interface CaptionedImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  captionClassName?: string;
  width?: number;
  height?: number;
}

const CaptionedImage: React.FC<CaptionedImageProps> = ({
  src,
  alt,
  caption,
  className,
  imageClassName,
  captionClassName,
  width = 1200,
  height = 800
}) => {
  if (!src) return null;
  
  return (
    <div className={`${className || ''}`}>
      <OptimizedImage 
        src={src}
        alt={alt}
        caption={caption}
        className={imageClassName}
        captionClassName={captionClassName}
        width={width}
        height={height}
      />
    </div>
  );
};

export default CaptionedImage;
