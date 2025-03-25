
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Article } from '@/lib/articles';
import TagList from './TagList';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import OptimizedImage from './OptimizedImage';

interface ArticleCardWithTagsProps {
  article: Article;
  className?: string;
  variant?: 'default' | 'compact';
}

const ArticleCardWithTags: React.FC<ArticleCardWithTagsProps> = React.memo(({ 
  article, 
  className, 
  variant = 'default' 
}) => {
  return (
    <article
      className={cn(
        'group overflow-hidden rounded-lg border bg-background transition-colors',
        className
      )}
    >
      {article.image && (
        <div className="w-full">
          <AspectRatio ratio={21 / 9}>
            <Link to={`/article/${article.slug}`} className="block w-full h-full">
              <OptimizedImage
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                width={640}
                height={274}
              />
            </Link>
          </AspectRatio>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="space-y-1">
            <h3
              className={cn(
                'font-medium leading-none',
                variant === 'default' ? 'text-lg' : 'text-base'
              )}
            >
              <Link to={`/article/${article.slug}`} className="hover:text-primary transition-colors">
                {article.title}
              </Link>
            </h3>
            
            {variant === 'default' && article.excerpt && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {article.excerpt}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              <span>{article.date}</span>
              <span className="mx-1">•</span>
              <Link 
                to={`/articles/${article.category.toLowerCase()}`} 
                className="hover:text-primary"
              >
                {article.category}
              </Link>
            </div>
            
            {variant === 'default' && (
              <Link
                to={`/article/${article.slug}`}
                className="flex items-center hover:text-primary"
              >
                <span className="sr-only">Read more</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          
          {/* Tags temporarily disabled */}
          {/* {article.tags && article.tags.length > 0 && (
            <TagList tags={article.tags} compact={true} className="mt-2" />
          )} */}
        </div>
      </div>
    </article>
  );
});

ArticleCardWithTags.displayName = 'ArticleCardWithTags';

export default ArticleCardWithTags;
