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
    <div className="mb-6">
      <div
        className="mx-auto flex items-center justify-center bg-white"
        style={{ width: '100%', maxWidth: '1200px', height: '800px' }}
      >
        <OptimizedImage
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
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
