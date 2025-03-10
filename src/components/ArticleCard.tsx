
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

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

const ArticleCard: React.FC<ArticleCardProps> = ({
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
  
  return (
    <article
      className={cn(
        'group relative overflow-hidden flex flex-col bg-background border border-border/50 hover:border-border transition-all',
        isCompact ? 'h-full' : '',
        className
      )}
    >
      <div className={cn('overflow-hidden', isCompact ? 'h-40' : 'h-48')}>
        <Link to={`/article/${slug}`} aria-label={title}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>
      
      <div className={cn('flex flex-col flex-grow', isCompact ? 'p-4' : 'p-5')}>
        <div className="flex items-center gap-x-3 mb-2">
          <Link
            to={`/articles/${category.toLowerCase()}`}
            className={cn(
              "text-xs font-medium uppercase tracking-wider text-primary",
              isCompact && "text-[10px]"
            )}
          >
            {category}
          </Link>
          <span className={cn(
            "text-xs text-muted-foreground",
            isCompact && "text-[10px]"
          )}>
            {date}
          </span>
        </div>
        
        <h3 className={cn(
          "font-serif font-medium mb-2 transition-colors group-hover:text-primary/80 line-clamp-2",
          isCompact ? "text-base" : "text-xl"
        )}>
          <Link to={`/article/${slug}`}>{title}</Link>
        </h3>
        
        {!isCompact && excerpt && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{excerpt}</p>
        )}
        
        <div className="mt-auto text-xs text-muted-foreground">
          By {author}
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
