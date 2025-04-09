
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import OptimizedImage from '@/components/OptimizedImage';

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  slug: string;
  commentCount?: number;
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
  commentCount = 0,
  layout = 'horizontal',
  className,
}) => {
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
        <div className="overflow-hidden bg-white rounded-md">
          <AspectRatio ratio={21 / 9}>
            <Link to={`/article/${slug}`} aria-label={title} className="block w-full h-full">
              {image ? (
                <OptimizedImage
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain bg-white"
                  width={1200}
                  height={570}
                  priority={true}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <span>No image</span>
                </div>
              )}
            </Link>
          </AspectRatio>
        </div>
      </div>
      
      <div className="flex flex-col justify-center p-4">
        <div className="flex items-center gap-x-4 mb-2">
          <Link
            to={`/articles/${category}`}
            className="text-xs font-medium uppercase tracking-wider text-primary"
          >
            {category}
          </Link>
          <span className="text-xs text-muted-foreground">{date}</span>
          
          {/* Comment count temporarily disabled */}
          {/* {commentCount > 0 && (
            <Link
              to={`/article/${slug}#comments`}
              className="text-xs flex items-center text-muted-foreground hover:text-primary"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              {commentCount}
            </Link>
          )} */}
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
