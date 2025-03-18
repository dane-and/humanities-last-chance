
import React from 'react';
import { Article } from '@/lib/types/article';
import { Button } from '@/components/ui/button';
import { Trash2, Send } from 'lucide-react';
import { publishDraft } from '@/lib/utils/storage/publishDraftStorage';
import { toast } from 'sonner';

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
  // Check if we're viewing drafts based on the articles
  const isDraftsTab = articleList.length > 0 && 
    (articleList[0].isDraft || articleList[0].status === 'draft');

  const handlePublishDraft = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    console.log(`Attempting to publish draft: "${title}" (ID: ${id})`);
    
    if (window.confirm(`Are you sure you want to publish "${title}"?`)) {
      try {
        const success = publishDraft(id);
        
        if (success) {
          console.log(`Successfully published draft: "${title}"`);
          toast.success(`"${title}" has been published successfully`);
          
          // Dispatch the articlesUpdated event to refresh UI components
          window.dispatchEvent(new CustomEvent('articlesUpdated'));
        } else {
          console.error(`Failed to publish draft: "${title}"`);
          toast.error(`Failed to publish "${title}". Please try again.`);
        }
      } catch (error) {
        console.error(`Error publishing draft "${title}":`, error);
        toast.error(`An error occurred while publishing "${title}". Please try again.`);
      }
    }
  };
  
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
            <div className="flex">
              {/* Show publish button only for drafts */}
              {isDraftsTab && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={(e) => handlePublishDraft(article.id, article.title, e)}
                  title="Publish draft"
                >
                  <Send className="h-4 w-4" />
                </Button>
              )}
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
                title="Delete article"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
