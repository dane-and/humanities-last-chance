
import React from 'react';
import ArticleCard from './ArticleCard';
import { cn } from '@/lib/utils';
import { Article } from '@/lib/types/article';

interface ArticleGridProps {
  articles: Article[];
  columns?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'compact';
  className?: string;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  columns = 3,
  variant = 'default',
  className,
}) => {
  const gridCols = {
    1: '',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };
  
  return (
    <div className={cn(
      'grid grid-cols-1 gap-6',
      gridCols[columns],
      className
    )}>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          excerpt={article.excerpt || ""}
          category={article.category}
          author={article.author || ""}
          date={article.date}
          image={article.image || ""}
          slug={article.slug}
          variant={variant}
        />
      ))}
    </div>
  );
};

export default ArticleGrid;
