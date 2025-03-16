
import React from 'react';
import { Page } from '@/lib/types/page';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface PageListProps {
  pageList: Page[];
  selectedPage: Page | null;
  onPageSelect: (id: string) => void;
  onNewPage: () => void;
  onDeletePage: (id: string) => void;
}

const PageList: React.FC<PageListProps> = ({ 
  pageList, 
  selectedPage, 
  onPageSelect,
  onNewPage,
  onDeletePage
}) => {
  return (
    <div className="md:col-span-1 bg-background p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Pages</h2>
        <Button size="sm" onClick={onNewPage}>New</Button>
      </div>
      
      <div className="space-y-2 max-h-[70vh] overflow-y-auto">
        {pageList.map(page => (
          <div 
            key={page.id}
            className="flex items-center justify-between p-2 rounded hover:bg-muted"
          >
            <div 
              className={`flex-1 cursor-pointer ${selectedPage?.id === page.id ? 'bg-muted' : ''}`}
              onClick={() => onPageSelect(page.id)}
            >
              <div className="font-medium truncate">{page.title}</div>
              <div className="text-xs text-muted-foreground">{page.lastUpdated}</div>
              {page.isSystem && (
                <div className="text-xs text-primary mt-1">System Page</div>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={(e) => {
                e.stopPropagation();
                onDeletePage(page.id);
              }}
              disabled={page.isSystem}
              title={page.isSystem ? "System pages cannot be deleted" : "Delete page"}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageList;
