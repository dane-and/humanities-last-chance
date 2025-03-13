
import React from 'react';
import { Article } from '@/lib/types/article';
import { Button } from '@/components/ui/button';

interface ArticleListProps {
  articleList: Article[];
  selectedArticle: Article | null;
  onArticleSelect: (id: string) => void;
  onNewArticle: () => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ 
  articleList, 
  selectedArticle, 
  onArticleSelect,
  onNewArticle
}) => {
  return (
    <div className="md:col-span-1 bg-background p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Articles</h2>
        <Button size="sm" onClick={onNewArticle}>New</Button>
      </div>
      
      <div className="space-y-2 max-h-[70vh] overflow-y-auto">
        {articleList.map(article => (
          <div 
            key={article.id}
            className={`p-2 rounded cursor-pointer hover:bg-muted ${selectedArticle?.id === article.id ? 'bg-muted' : ''}`}
            onClick={() => onArticleSelect(article.id)}
          >
            <div className="font-medium truncate">{article.title}</div>
            <div className="text-xs text-muted-foreground">{article.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
