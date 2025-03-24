import React from 'react';
import { Article } from '@/lib/types/article';

interface ArticleImageProps {
  article: Article;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ article }) => {
  if (!article.image) return null;

  return (
    <div className="relative max-w-full mx-auto my-8">
      <div
        className="w-full h-full absolute top-0 left-0 z-0 rounded-lg"
        style={{
          backgroundImage: `url(${article.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          opacity: 0.25,
          borderRadius: '0.5rem',
        }}
      />
      <img
        src={article.image}
        alt={article.imageCaption || article.title}
        className="relative z-10 mx-auto rounded-lg shadow"
        style={{
          maxWidth: '100%',
          maxHeight: '800px',
          display: 'block',
          objectFit: 'contain',
          background: 'white',
        }}
      />
    </div>
  );
};

export default ArticleImage;


