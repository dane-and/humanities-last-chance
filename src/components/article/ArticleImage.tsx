
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
      <div className="max-w-[1200px] w-full bg-white rounded-md overflow-hidden">
        <OptimizedImage 
          src={article.image}
          alt={article.imageCaption || article.title}
          className="mx-auto w-auto max-w-full"
          width={1200}
          height={800}
          caption={article.imageCaption}
        />
      </div>
    </div>
  );
};

export default ArticleImage;
