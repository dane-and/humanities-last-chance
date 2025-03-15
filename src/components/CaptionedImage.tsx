
import React from 'react';

interface CaptionedImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  captionClassName?: string;
}

const CaptionedImage: React.FC<CaptionedImageProps> = ({
  src,
  alt,
  caption,
  className,
  imageClassName,
  captionClassName
}) => {
  return (
    <figure className={`relative ${className || ''}`}>
      <img 
        src={src} 
        alt={alt} 
        className={imageClassName || 'w-full h-full object-cover object-center'}
      />
      {caption && (
        <figcaption className={`text-sm text-gray-500 mt-2 text-center italic ${captionClassName || ''}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default CaptionedImage;
