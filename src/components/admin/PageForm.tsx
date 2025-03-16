
import React, { useState, useEffect } from 'react';
import { Page } from '@/lib/types/page';
import { useToast } from '@/hooks/use-toast';
import { savePagesToStorage } from '@/lib/types/page';
import { 
  PageFormHeader, 
  PageFormFields, 
  PageFormActions 
} from './page-form';

interface PageFormProps {
  pageList: Page[];
  selectedPage: Page | null;
  onPageListUpdate: (updatedPages: Page[]) => void;
  onNewPage: () => void;
}

const PageForm: React.FC<PageFormProps> = ({ 
  pageList, 
  selectedPage, 
  onPageListUpdate, 
  onNewPage 
}) => {
  const { toast } = useToast();
  
  const [pageFormData, setPageFormData] = useState({
    id: selectedPage?.id || '',
    title: selectedPage?.title || '',
    slug: selectedPage?.slug || '',
    content: selectedPage?.content || '',
    lastUpdated: selectedPage?.lastUpdated || new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    }),
    isSystem: selectedPage?.isSystem || false
  });

  // Update form when selectedPage changes
  useEffect(() => {
    if (selectedPage) {
      setPageFormData({
        id: selectedPage.id,
        title: selectedPage.title,
        slug: selectedPage.slug,
        content: selectedPage.content,
        lastUpdated: selectedPage.lastUpdated,
        isSystem: selectedPage.isSystem || false
      });
    } else {
      // Reset form for new page
      setPageFormData({
        id: `page_${Date.now()}`,
        title: '',
        slug: '',
        content: '',
        lastUpdated: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', month: 'long', day: 'numeric' 
        }),
        isSystem: false
      });
    }
  }, [selectedPage]);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPageFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePageEditorChange = (content: string) => {
    setPageFormData(prev => ({ ...prev, content }));
  };

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!pageFormData.title || !pageFormData.content) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields (title, content)',
        variant: 'destructive',
      });
      return;
    }
    
    // Generate slug if empty
    if (!pageFormData.slug) {
      pageFormData.slug = pageFormData.title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    }
    
    // Update current date
    pageFormData.lastUpdated = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Update or add page
    let updatedPages;
    if (selectedPage) {
      updatedPages = pageList.map(page => 
        page.id === pageFormData.id ? { ...pageFormData } : page
      );
      toast({
        title: 'Success',
        description: 'Page updated successfully',
      });
    } else {
      updatedPages = [...pageList, pageFormData];
      toast({
        title: 'Success',
        description: 'New page created successfully',
      });
    }
    
    onPageListUpdate(updatedPages);
    savePagesToStorage(updatedPages);
  };

  const handlePageDelete = () => {
    if (!selectedPage) return;
    
    if (selectedPage.isSystem) {
      toast({
        title: 'Error',
        description: 'System pages cannot be deleted. You can only edit their content.',
        variant: 'destructive',
      });
      return;
    }
    
    if (confirm('Are you sure you want to delete this page?')) {
      const updatedPages = pageList.filter(page => page.id !== selectedPage.id);
      onPageListUpdate(updatedPages);
      savePagesToStorage(updatedPages);
      
      onNewPage();
      
      toast({
        title: 'Success',
        description: 'Page deleted successfully',
      });
    }
  };

  return (
    <div className="md:col-span-3 bg-background p-6 rounded-lg border">
      <PageFormHeader selectedPage={selectedPage} />
      
      <form onSubmit={handlePageSubmit} className="space-y-4">
        <PageFormFields 
          title={pageFormData.title}
          slug={pageFormData.slug}
          content={pageFormData.content}
          isSystemPage={pageFormData.isSystem}
          onInputChange={handlePageInputChange}
          onEditorChange={handlePageEditorChange}
        />
        
        <PageFormActions 
          selectedPage={selectedPage}
          onDelete={handlePageDelete}
        />
      </form>
    </div>
  );
};

export default PageForm;
