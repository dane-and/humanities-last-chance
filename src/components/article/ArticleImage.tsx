
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
    <div className="mb-6 overflow-hidden rounded-lg bg-white">
      <div className="relative max-w-[1200px] mx-auto bg-white">
        <OptimizedImage
          src={image}
          alt={title}
          className="w-full h-auto max-h-[800px] object-contain mx-auto"
          caption={imageCaption || ''}
          captionClassName="text-center text-sm text-muted-foreground mt-2 italic"
          width={1200}
          height={800}
          priority={true}
        />
      </div>
    </div>
  );
};

export default ArticleImage;
