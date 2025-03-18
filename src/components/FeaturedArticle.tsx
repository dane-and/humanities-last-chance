
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  slug: string;
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = React.memo(({
  title,
  excerpt,
  category,
  author,
  date,
  image,
  slug,
  layout = 'horizontal',
  className,
}) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Set the background image for the blur effect
  useEffect(() => {
    if (imageContainerRef.current && image) {
      imageContainerRef.current.style.setProperty('--bg-image', `url(${image})`);
    }
  }, [image]);
  
  return (
    <article 
      className={cn(
        'group relative overflow-hidden transition-all bg-background border border-border/50 hover:border-border',
        layout === 'horizontal' 
          ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
          : 'flex flex-col',
        className
      )}
    >
      <div className={cn(
        'overflow-hidden',
        layout === 'horizontal' ? 'h-auto' : 'h-auto'
      )}>
        <AspectRatio ratio={21 / 9} className="overflow-hidden">
          <Link to={`/article/${slug}`} aria-label={title} className="block w-full h-full">
            {image ? (
              <div className="article-image-container" ref={imageContainerRef}>
                <img
                  src={image}
                  alt={title}
                  className="article-image"
                  width={1200}
                  height={570}
                  loading="eager"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                <span>No image</span>
              </div>
            )}
          </Link>
        </AspectRatio>
      </div>
      
      <div className="flex flex-col justify-center p-4">
        <div className="flex items-center gap-x-4 mb-2">
          <Link
            to={`/articles/${category.toLowerCase()}`}
            className="text-xs font-medium uppercase tracking-wider text-primary"
          >
            {category}
          </Link>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        
        <h2 className="font-serif text-2xl font-medium mb-2 transition-colors group-hover:text-primary/80">
          <Link to={`/article/${slug}`}>{title}</Link>
        </h2>
        
        <p className="text-muted-foreground mb-3">{excerpt}</p>
        
        <div className="mt-auto">
          <Link
            to={`/article/${slug}`}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Read more
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
});

FeaturedArticle.displayName = 'FeaturedArticle';

export default FeaturedArticle;
