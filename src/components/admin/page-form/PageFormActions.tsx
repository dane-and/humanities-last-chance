
import React from 'react';
import { Button } from '@/components/ui/button';
import { Page } from '@/lib/types/page';

interface PageFormActionsProps {
  selectedPage: Page | null;
  onDelete: () => void;
  isSubmitting?: boolean;
}

const PageFormActions: React.FC<PageFormActionsProps> = ({ 
  selectedPage, 
  onDelete, 
  isSubmitting = false 
}) => {
  return (
    <div className="flex gap-4 justify-end">
      {selectedPage && !selectedPage.isSystem && (
        <Button type="button" variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {selectedPage ? 'Update' : 'Create'} Page
      </Button>
    </div>
  );
};

export default PageFormActions;
