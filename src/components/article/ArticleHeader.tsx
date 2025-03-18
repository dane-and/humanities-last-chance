
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Article } from '@/lib/types/article';
import { Link } from 'react-router-dom';

interface ArticleHeaderProps {
  article: Article;
  onGoBack: () => void;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, onGoBack }) => {
  // Debug the category value
  console.log(`ArticleHeader: Article "${article.title}" has category "${article.category}"`);
  
  return (
    <>
      <div className="flex items-center mb-6 gap-4">
        <Button 
          variant="ghost" 
          onClick={onGoBack}
          className="flex items-center text-muted-foreground hover:text-foreground"
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Home
        </Button>
        <h1 className="text-3xl font-serif font-bold">{article.title}</h1>
      </div>
      
      <div className="mb-4 block">
        <span className="text-muted-foreground text-sm inline-block">{article.date}</span>
        <span className="text-muted-foreground mx-2 text-sm inline-block">•</span>
        <Link 
          to={`/articles/${article.category.toLowerCase()}`} 
          className="text-primary font-medium text-sm inline-block"
        >
          {article.category}
        </Link>
      </div>
      
      <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>
    </>
  );
};

export default ArticleHeader;
