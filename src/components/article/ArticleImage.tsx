
import React from 'react';
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
      <OptimizedImage
        src={image}
        alt={title}
        className="mx-auto"
        caption={imageCaption || ''}
        captionClassName="text-center text-sm text-muted-foreground mt-2 italic"
        width={1200}
        height={675}
        priority={true}
      />
    </div>
  );
};

export default ArticleImage;
