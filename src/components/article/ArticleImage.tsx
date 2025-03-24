import React from 'react';

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ src, alt, caption }) => {
  return (
    <div className="w-full flex justify-center bg-white py-8">
      <div className="relative w-full max-w-[1200px] aspect-[3/2] overflow-hidden rounded-xl shadow-sm">
        <img
          src={src}
          alt={alt}
          className="absolute top-0 left-0 w-full h-full object-contain bg-white"
        />
      </div>
      {caption && (
        <p className="text-muted-foreground text-sm mt-2 text-center">{caption}</p>
      )}
    </div>
  );
};

export default ArticleImage;

