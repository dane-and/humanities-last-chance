
import React from 'react';
import { Article } from '@/lib/types/article';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface ArticleListProps {
  articleList: Article[];
  selectedArticle: Article | null;
  onArticleSelect: (id: string) => void;
  onNewArticle: () => void;
  onDeleteArticle: (id: string) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ 
  articleList, 
  selectedArticle, 
  onArticleSelect,
  onNewArticle,
  onDeleteArticle
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
            className="flex items-center justify-between p-2 rounded hover:bg-muted"
          >
            <div 
              className={`flex-1 cursor-pointer ${selectedArticle?.id === article.id ? 'bg-muted' : ''}`}
              onClick={() => onArticleSelect(article.id)}
            >
              <div className="font-medium truncate">{article.title}</div>
              <div className="text-xs text-muted-foreground">{article.date}</div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to delete "${article.title}"?`)) {
                  onDeleteArticle(article.id);
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
