
import { useState, useEffect } from 'react';
import { Article } from '../lib/types/article';
import { toast } from 'sonner';

export const useArticleForm = (
  articleList: Article[],
  selectedArticle: Article | null,
  onArticleListUpdate: (updatedList: Article[]) => void,
  onNewArticle: () => void
) => {
  // Default form state
  const defaultFormState = {
    id: '',
    title: '',
    slug: '',
    author: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: 'Blog',
    image: '',
    excerpt: '',
    content: '',
    featured: false,
    comments: []
  };

  // Form state
  const [formData, setFormData] = useState<Article>(defaultFormState);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);

  // Set form data when selected article changes
  useEffect(() => {
    if (selectedArticle) {
      setFormData(selectedArticle);
      setSelectedTags(selectedArticle.tags || []);
    } else {
      setFormData(defaultFormState);
      setSelectedTags([]);
    }
  }, [selectedArticle]);

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

  // Handle select change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  // Handle tags change
  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
    setFormData({
      ...formData,
      tags
    });
  };

  // Handle image change
  const handleImageChange = (url: string) => {
    setFormData({
      ...formData,
      image: url
    });
  };
  
  // Handle save edited image
  const handleSaveEditedImage = (editedImage: string) => {
    setFormData({
      ...formData,
      image: editedImage
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
    
    let updatedList: Article[];
    
    if (selectedArticle) {
      // Update existing article
      updatedList = articleList.map(article => 
        article.id === formData.id ? { ...formData, tags: selectedTags } : article
      );
      toast.success("Article updated successfully");
    } else {
      // Create new article
      const newArticle: Article = {
        ...formData,
        id: crypto.randomUUID(),
        tags: selectedTags,
        comments: []
      };
      
      updatedList = [...articleList, newArticle];
      toast.success("Article created successfully");
      onNewArticle();
    }
    
    onArticleListUpdate(updatedList);
    localStorage.setItem('hlc-articles', JSON.stringify(updatedList));
  };

  // Handle article deletion
  const handleDelete = () => {
    if (!selectedArticle) return;
    
    if (window.confirm(`Are you sure you want to delete "${selectedArticle.title}"?`)) {
      const updatedList = articleList.filter(article => article.id !== selectedArticle.id);
      onArticleListUpdate(updatedList);
      localStorage.setItem('hlc-articles', JSON.stringify(updatedList));
      onNewArticle();
      toast.success("Article deleted successfully");
    }
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
    selectedTags,
    isImageEditorOpen,
    setIsImageEditorOpen,
    handleInputChange,
    handleEditorChange,
    handleSelectChange,
    handleCheckboxChange,
    handleTagsChange,
    handleImageChange,
    handleSaveEditedImage,
    handleSubmit,
    handleDelete
  };
};
