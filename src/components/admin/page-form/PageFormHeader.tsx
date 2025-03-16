
import React from 'react';
import { Page } from '@/lib/types/page';

interface PageFormHeaderProps {
  selectedPage: Page | null;
}

const PageFormHeader: React.FC<PageFormHeaderProps> = ({ selectedPage }) => {
  return (
    <h2 className="text-xl font-bold mb-4">
      {selectedPage ? `Edit Page: ${selectedPage.title}` : 'New Page'}
    </h2>
  );
};

export default PageFormHeader;
