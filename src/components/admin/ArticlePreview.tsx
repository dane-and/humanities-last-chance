
import React from 'react';
import { Article } from '@/lib/types/article';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface ArticlePreviewProps {
  article: Article;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Preview: {article.title}</DialogTitle>
        </DialogHeader>
        
        <div className="preview-container mt-4">
          <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
          
          {article.image && (
            <div className="mb-4">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-auto rounded-md" 
              />
              {article.imageCaption && (
                <p className="text-sm text-gray-500 mt-1">{article.imageCaption}</p>
              )}
            </div>
          )}
          
          <div className="text-sm text-gray-500 mb-4">
            {article.author && <span>By {article.author} | </span>}
            <span>{article.date}</span>
            {article.category && <span> | {article.category}</span>}
          </div>
          
          {article.excerpt && (
            <div className="text-lg font-medium mb-4 italic">
              {article.excerpt}
            </div>
          )}
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {article.tags && article.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticlePreview;
