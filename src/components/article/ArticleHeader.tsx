import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Article } from '@/lib/types/article';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface ArticleHeaderProps {
  article: Article;
  onGoBack: () => void;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, onGoBack }) => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="mb-6">
        <div className="mb-2">
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
        <h1 className="text-3xl font-serif font-bold">{article.title}</h1>
      </div>

      <div className="mb-4 block">
        <span className="text-muted-foreground text-sm inline-block">{article.date}</span>
        <span className="text-muted-foreground mx-2 text-sm inline-block">•</span>
        <Link 
          to={`/articles/${article.category}`} 
          className="text-primary font-medium text-sm inline-block capitalize"
        >
          {article.category}
        </Link>
      </div>

      <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>
    </>
  );
};

export default ArticleHeader;
