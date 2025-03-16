
import { useState, useEffect } from 'react';
import { Page } from '../lib/types/page';
import { savePagesToStorage } from '../lib/types/page';
import { toast } from 'sonner';

export const usePageForm = (
  pageList: Page[],
  selectedPage: Page | null,
  onPageListUpdate: (updatedList: Page[]) => void,
  onNewPage: () => void
) => {
  // Default form state
  const defaultFormState: Page = {
    id: '',
    title: '',
    slug: '',
    content: '',
    lastUpdated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    isSystem: false
  };

  // Form state
  const [formData, setFormData] = useState<Page>(defaultFormState);

  // Set form data when selected page changes
  useEffect(() => {
    if (selectedPage) {
      setFormData(selectedPage);
    } else {
      setFormData(defaultFormState);
    }
  }, [selectedPage]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // If changing title and there's no custom slug yet, auto-generate one
    if (name === 'title' && (!formData.slug || formData.slug === generateSlug(formData.title))) {
      setFormData({
        ...formData,
        title: value,
        slug: generateSlug(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle rich text editor change
  const handleEditorChange = (content: string) => {
    setFormData({
      ...formData,
      content
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error("Content is required");
      return;
    }
    
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    let updatedList: Page[];
    
    if (selectedPage) {
      // Update existing page
      updatedList = pageList.map(page => 
        page.id === formData.id ? { 
          ...formData, 
          lastUpdated: currentDate,
          // For system pages, only allow content updates
          title: page.isSystem ? page.title : formData.title,
          slug: page.isSystem ? page.slug : formData.slug
        } : page
      );
      toast.success("Page updated successfully");
    } else {
      // Create new page
      const newPage: Page = {
        ...formData,
        id: `page_${crypto.randomUUID()}`,
        lastUpdated: currentDate,
        isSystem: false // New pages are never system pages
      };
      
      updatedList = [...pageList, newPage];
      toast.success("Page created successfully");
      onNewPage();
    }
    
    onPageListUpdate(updatedList);
    savePagesToStorage(updatedList);
  };

  // Helper function to generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single one
      .trim();
  };

  return {
    formData,
    handleInputChange,
    handleEditorChange,
    handleSubmit,
    isSystemPage: selectedPage?.isSystem || false
  };
};
