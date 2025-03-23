
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
    <div className="mb-6 overflow-hidden bg-white">
      <OptimizedImage
        src={image}
        alt={title}
        className="mx-auto object-contain max-h-[800px]"
        caption={imageCaption || ''}
        captionClassName="text-center text-sm text-muted-foreground mt-2 italic"
        width={1200}
        height={800}
        priority={true}
      />
    </div>
  );
};

export default ArticleImage;
