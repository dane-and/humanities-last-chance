
import React from 'react';
import { Article } from '@/lib/types/article';
import OptimizedImage from '@/components/OptimizedImage';

interface ArticleImageProps {
  article: Article;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ article }) => {
  if (!article.image) return null;
  
  // Use consistent dimensions for all article types
  const maxWidth = 500;
  const maxHeight = 350;

  return (
    <div className="w-full flex justify-center my-6">
      <div className="max-w-md w-full bg-white rounded-md overflow-hidden shadow-sm">
        <OptimizedImage 
          src={article.image}
          alt={article.imageCaption || article.title}
          className="mx-auto w-auto object-contain"
          width={maxWidth}
          height={maxHeight}
          caption={article.imageCaption}
        />
      </div>
    </div>
  );
};

export default ArticleImage;
