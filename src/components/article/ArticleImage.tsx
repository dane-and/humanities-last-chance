
import React from 'react';
import { Article } from '@/lib/types/article';
import OptimizedImage from '@/components/OptimizedImage';

interface ArticleImageProps {
  article: Article;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ article }) => {
  if (!article.image) return null;
  
  // Check if this is an interview or review to apply special styling
  const isInterviewOrReview = 
    article.category === 'Interview' || 
    article.category === 'Review' || 
    article.category?.toLowerCase() === 'interviews' || 
    article.category?.toLowerCase() === 'reviews';
  
  // Use larger dimensions for interviews and reviews
  const maxWidth = isInterviewOrReview ? 600 : 600;
  const maxHeight = isInterviewOrReview ? 600 : 450;
  
  return (
    <div className={`w-full flex justify-center my-6 ${isInterviewOrReview ? 'px-4 sm:px-6' : ''}`}>
      <div className={`${isInterviewOrReview ? 'w-full max-w-[600px]' : 'max-w-2xl w-full'} bg-white rounded-md overflow-hidden shadow-sm`}>
        <OptimizedImage 
          src={article.image}
          alt={article.imageCaption || article.title}
          className={`mx-auto w-auto ${isInterviewOrReview ? 'max-h-full h-auto object-contain' : 'object-contain'}`}
          width={maxWidth}
          height={maxHeight}
          caption={article.imageCaption}
        />
      </div>
    </div>
  );
};

export default ArticleImage;
