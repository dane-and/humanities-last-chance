import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Article } from '@/lib/types/article';
import { useIsMobile } from '@/hooks/use-mobile';

interface ArticleHeaderProps {
  article: Article;
  onGoBack: () => void;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, onGoBack }) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative mb-6">
      <div
        className={`${
          isMobile ? 'text-center mb-2' : 'absolute top-0 left-0'
        }`}
      >
        <Button
          variant="ghost"
          onClick={onGoBack}
          className="flex items-center text-muted-foreground hover:text-foreground"
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Home
        </Button>
      </div>

      <h1 className="text-3xl font-serif font-bold text-center">{article.title}</h1>

      <div className="mt-6 text-center text-muted-foreground text-sm">
        <span>{article.date}</span>
        <span className="mx-2">•</span>
        <span className="text-primary font-medium capitalize">{article.category}</span>
      </div>

      {article.excerpt && (
        <p className="text-lg text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
          {article.excerpt}
        </p>
      )}
    </div>
  );
};

export default ArticleHeader;


