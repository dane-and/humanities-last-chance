
import React from 'react';
import { Article } from '@/lib/types/article';
import OptimizedImage from '@/components/OptimizedImage';

interface ArticleImageProps {
  article: Article;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ article }) => {
  if (!article.image) return null;

  // Determine if the article is a blog post
  const isBlogPost = article.category?.toLowerCase() === 'blog';
  
  // Use smaller dimensions for blog posts
  const maxWidth = isBlogPost ? 500 : 700;
  const maxHeight = isBlogPost ? 350 : 500;

  return (
    <div className="w-full flex justify-center my-8">
      <div className={`max-w-lg w-full bg-white rounded-md overflow-hidden shadow-sm ${isBlogPost ? 'max-w-md' : 'max-w-lg'}`}>
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
