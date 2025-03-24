
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
      <div className="max-w-xl w-full bg-white rounded-md overflow-hidden shadow-sm">
        <OptimizedImage 
          src={article.image}
          alt={article.imageCaption || article.title}
          className="mx-auto w-auto max-h-[500px] object-contain"
          width={700}
          height={500}
          caption={article.imageCaption}
        />
      </div>
    </div>
  );
};

export default ArticleImage;
