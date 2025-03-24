import React from 'react';

interface ArticleImageProps {
  image: string;
  title: string;
  imageCaption?: string;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ image, title, imageCaption }) => {
  if (!image) return null;

  return (
    <div className="w-full flex justify-center bg-white py-8">
      <div className="relative w-full max-w-[1200px] aspect-[3/2] overflow-hidden rounded-xl shadow-sm">
        <img
          src={image}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-contain bg-white"
        />
      </div>
      {imageCaption && (
        <p className="text-muted-foreground text-sm mt-2 text-center">{imageCaption}</p>
      )}
    </div>
  );
};

export default ArticleImage;


