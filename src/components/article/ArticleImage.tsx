
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import OptimizedImage from '@/components/OptimizedImage';

interface ArticleImageProps {
  image: string;
  title: string;
  imageCaption?: string;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ image, title, imageCaption }) => {
  if (!image || image.trim() === '') {
    return null;
  }
  
  return (
    <div className="mb-6 overflow-hidden rounded-lg">
      <AspectRatio ratio={16 / 9}>
        <OptimizedImage
          src={image}
          alt={title}
          className="w-full h-full"
          caption={imageCaption || ''}
          width={1200}
          height={800}
        />
      </AspectRatio>
    </div>
  );
};

export default ArticleImage;
