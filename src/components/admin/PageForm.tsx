
import React, { useState } from 'react';
import { Page } from '@/lib/types/page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { savePagesToStorage } from '@/lib/types/page';

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
    lastUpdated: selectedPage?.lastUpdated || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    isSystem: selectedPage?.isSystem || false
  });

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image'
  ];

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
      pageFormData.slug = pageFormData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
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
      <h2 className="text-xl font-bold mb-4">
        {selectedPage ? `Edit Page: ${selectedPage.title}` : 'New Page'}
      </h2>
      
      <form onSubmit={handlePageSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input 
              name="title"
              value={pageFormData.title}
              onChange={handlePageInputChange}
              placeholder="Page title"
              disabled={pageFormData.isSystem}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input 
              name="slug"
              value={pageFormData.slug}
              onChange={handlePageInputChange}
              placeholder="url-friendly-slug"
              disabled={pageFormData.isSystem}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Content</label>
            <div className="border border-input rounded-md overflow-hidden">
              <ReactQuill 
                theme="snow"
                value={pageFormData.content}
                onChange={handlePageEditorChange}
                modules={modules}
                formats={formats}
                placeholder="Write your page content here..."
                className="min-h-[400px] bg-background"
              />
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-end">
          {selectedPage && !selectedPage.isSystem && (
            <Button type="button" variant="destructive" onClick={handlePageDelete}>
              Delete
            </Button>
          )}
          <Button type="submit">
            {selectedPage ? 'Update' : 'Create'} Page
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PageForm;
