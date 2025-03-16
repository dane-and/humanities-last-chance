
import { useState, useEffect } from 'react';
import { Page } from '../lib/types/page';
import { savePagesToStorage } from '../lib/types/page';
import { toast } from 'sonner';
import sanitizeHtml from 'sanitize-html';

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

  // Handle rich text editor change with enhanced sanitization
  const handleEditorChange = (content: string) => {
    // Enhanced sanitization to specifically prevent the onloadstart vulnerability
    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'p', 'br', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote', 'pre', 'code']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        'img': ['src', 'alt', 'title', 'width', 'height', 'class'],
        'a': ['href', 'name', 'target', 'rel', 'class'],
      },
      // Explicitly disallow all event handlers including onloadstart
      disallowedTagsMode: 'discard',
      allowedStyles: {
        '*': {
          'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
          'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
          'font-size': [/^\d+(?:px|em|%)$/]
        }
      }
    });
    
    setFormData({
      ...formData,
      content: sanitizedContent
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
    
    // Apply one more round of sanitization before saving
    const sanitizedContent = sanitizeHtml(formData.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'p', 'br', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote', 'pre', 'code']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        'img': ['src', 'alt', 'title', 'width', 'height', 'class'],
        'a': ['href', 'name', 'target', 'rel', 'class'],
      },
      disallowedTagsMode: 'discard',
      allowedStyles: {
        '*': {
          'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
          'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
          'font-size': [/^\d+(?:px|em|%)$/]
        }
      }
    });
    
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
          content: sanitizedContent,
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
        content: sanitizedContent,
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
