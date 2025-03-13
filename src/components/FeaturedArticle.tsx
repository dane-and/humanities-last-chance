
import React from 'react';
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

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
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
  return (
    <article 
      className={cn(
        'group relative overflow-hidden transition-all bg-background border border-border/50 hover:border-border',
        layout === 'horizontal' 
          ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
          : 'flex flex-col',
        className
      )}
    >
      <div className={cn(
        'overflow-hidden',
        layout === 'horizontal' ? 'h-auto' : 'h-auto'
      )}>
        <AspectRatio ratio={16 / 9} className="overflow-hidden">
          <Link to={`/article/${slug}`} aria-label={title} className="block w-full h-full">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        </AspectRatio>
      </div>
      
      <div className="flex flex-col justify-center p-6">
        <div className="flex items-center gap-x-4 mb-4">
          <Link
            to={`/articles/${category.toLowerCase()}`}
            className="text-xs font-medium uppercase tracking-wider text-primary"
          >
            {category}
          </Link>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        
        <h2 className="font-serif text-2xl font-medium mb-3 transition-colors group-hover:text-primary/80">
          <Link to={`/article/${slug}`}>{title}</Link>
        </h2>
        
        <p className="text-muted-foreground mb-4">{excerpt}</p>
        
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
};

export default FeaturedArticle;
