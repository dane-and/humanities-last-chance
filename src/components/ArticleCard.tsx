
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import OptimizedImage from '@/components/OptimizedImage';

interface ArticleCardProps {
  title: string;
  excerpt?: string;
  category: string;
  author: string;
  date: string;
  image: string;
  slug: string;
  variant?: 'default' | 'compact';
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = React.memo(({
  title,
  excerpt,
  category,
  author,
  date,
  image,
  slug,
  variant = 'default',
  className,
}) => {
  const isCompact = variant === 'compact';
  const hasImage = image && image.trim() !== '';
  
  return (
    <article
      className={cn(
        'group relative overflow-hidden flex flex-col bg-background border border-border/50 hover:border-border transition-all rounded-sm',
        isCompact ? 'h-full' : '',
        className
      )}
    >
      <div className={cn('flex flex-col flex-grow', isCompact ? 'p-4' : 'p-5')}>
        <h3 className={cn(
          "font-serif font-medium mb-2 transition-colors group-hover:text-primary/80 line-clamp-2",
          isCompact ? "text-base" : "text-xl"
        )}>
          <Link to={`/article/${slug}`}>{title}</Link>
        </h3>
        
        <div className="flex items-center gap-x-3 mb-1">
          <Link
            to={`/articles/${category.toLowerCase()}`}
            className={cn(
              "text-xs font-medium uppercase tracking-wider text-primary",
              isCompact && "text-[10px]"
            )}
          >
            {category} {/* Preserve original capitalization for display */}
          </Link>
          <span className={cn(
            "text-xs text-muted-foreground flex items-center",
            isCompact && "text-[10px]"
          )}>
            <Clock className="h-3 w-3 mr-1" />
            {date}
          </span>
        </div>
      </div>
      
      {/* Only render image if it exists and is not empty */}
      {hasImage && (
        <div className={cn('relative', isCompact ? 'h-auto' : 'h-auto')}>
          <AspectRatio ratio={21 / 9} className="overflow-hidden">
            <Link to={`/article/${slug}`} aria-label={title} className="block w-full h-full">
              <OptimizedImage
                src={image}
                alt={title}
                width={640}
                height={274}
                priority={false}
                className="w-full h-full"
              />
            </Link>
          </AspectRatio>
        </div>
      )}
      
      {!isCompact && excerpt && (
        <div className="p-5 pt-3">
          <p className="text-muted-foreground text-sm mb-0 line-clamp-2">{excerpt}</p>
        </div>
      )}
    </article>
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
