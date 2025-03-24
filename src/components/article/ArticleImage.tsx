import React from 'react';
import { Article } from '@/lib/types/article';

interface ArticleImageProps {
  article: Article;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ article }) => {
  if (!article.image) return null;

  return (
    <div
      className="mx-auto my-8 flex items-center justify-center"
      style={{
        width: '1200px',
        height: '800px',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
    >
      <img
        src={article.image}
        alt={article.imageCaption || article.title}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};

export default ArticleImage;

