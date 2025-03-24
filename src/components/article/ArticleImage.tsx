
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
  
  // Use much smaller dimensions for blog posts
  const maxWidth = isBlogPost ? 300 : 600;
  const maxHeight = isBlogPost ? 225 : 450;

  return (
    <div className="w-full flex justify-center my-6">
      <div className={`${isBlogPost ? 'max-w-xs' : 'max-w-md'} w-full bg-white rounded-md overflow-hidden shadow-sm`}>
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
