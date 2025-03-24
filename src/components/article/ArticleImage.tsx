import React from 'react';
import { Article } from '@/lib/types/article';

interface ArticleImageProps {
  article: Article;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ article }) => {
  if (!article.image) return null;

  return (
    <div
      className="relative mx-auto my-8 w-[1200px] h-[800px] overflow-hidden rounded-lg"
      style={{ background: 'white' }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${article.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          opacity: 0.25,
        }}
      />
      <img
        src={article.image}
        alt={article.imageCaption || article.title}
        className="absolute z-10"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
        }}
      />
    </div>
  );
};

export default ArticleImage;
