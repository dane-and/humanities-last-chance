
import React, { useState } from 'react';
import { Page, savePagesToStorage } from '@/lib/types/page';
import { toast } from 'sonner';
import PageList from '@/components/admin/PageList';
import PageForm from '@/components/admin/PageForm';

interface PageManagementProps {
  pageList: Page[];
  setPageList: React.Dispatch<React.SetStateAction<Page[]>>;
}

const PageManagement: React.FC<PageManagementProps> = ({ pageList, setPageList }) => {
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const handlePageSelect = (id: string) => {
    const page = pageList.find(p => p.id === id);
    if (page) {
      setSelectedPage(page);
    }
  };
  
  const handleNewPage = () => {
    setSelectedPage(null);
  };
  
  const handleDeletePage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      const updatedList = pageList.filter(page => page.id !== id);
      setPageList(updatedList);
      savePagesToStorage(updatedList);
      
      // If the deleted page was selected, clear the selection
      if (selectedPage && selectedPage.id === id) {
        setSelectedPage(null);
      }
      
      toast.success("Page deleted successfully");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <PageList 
        pageList={pageList}
        selectedPage={selectedPage}
        onPageSelect={handlePageSelect}
        onNewPage={handleNewPage}
        onDeletePage={handleDeletePage}
      />
      
      <PageForm 
        pageList={pageList}
        selectedPage={selectedPage}
        onPageListUpdate={setPageList}
        onNewPage={handleNewPage}
      />
    </div>
  );
};

export default PageManagement;
