
import React from 'react';
import { Article } from '@/lib/types/article';
import OptimizedImage from '@/components/OptimizedImage';

interface ArticleImageProps {
  article: Article;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ article }) => {
  if (!article.image) return null;

  return (
    <div className="w-full flex justify-center my-8">
      <div className="max-w-2xl w-full bg-white rounded-md overflow-hidden">
        <OptimizedImage 
          src={article.image}
          alt={article.imageCaption || article.title}
          className="mx-auto w-auto max-h-[600px] object-contain"
          width={800}
          height={600}
          caption={article.imageCaption}
        />
      </div>
    </div>
  );
};

export default ArticleImage;
