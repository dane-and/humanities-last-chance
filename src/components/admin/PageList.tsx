
import React from 'react';
import { Page } from '@/lib/types/page';
import { Button } from '@/components/ui/button';

interface PageListProps {
  pageList: Page[];
  selectedPage: Page | null;
  onPageSelect: (id: string) => void;
  onNewPage: () => void;
}

const PageList: React.FC<PageListProps> = ({ 
  pageList, 
  selectedPage, 
  onPageSelect,
  onNewPage
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
            className={`p-2 rounded cursor-pointer hover:bg-muted ${selectedPage?.id === page.id ? 'bg-muted' : ''}`}
            onClick={() => onPageSelect(page.id)}
          >
            <div className="font-medium truncate">{page.title}</div>
            <div className="text-xs text-muted-foreground">{page.lastUpdated}</div>
            {page.isSystem && (
              <div className="text-xs text-primary mt-1">System Page</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageList;
