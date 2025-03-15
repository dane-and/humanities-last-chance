
import { useState, useEffect } from 'react';
import { Article } from '@/lib/types/article';
import { useToast } from '@/hooks/use-toast';

export interface ArticleFormState {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  category: string;
  image: string;
  imageCaption: string;
  excerpt: string;
  content: string;
  featured: boolean;
  tags: string[];
}

export const useArticleForm = (
  articleList: Article[],
  selectedArticle: Article | null,
  onArticleListUpdate: (updatedList: Article[]) => void,
  onNewArticle: () => void
) => {
  const { toast } = useToast();
  const [selectedTags, setSelectedTags] = useState<string[]>(selectedArticle?.tags || []);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
  
  const [formData, setFormData] = useState<ArticleFormState>({
    id: selectedArticle?.id || '',
    title: selectedArticle?.title || '',
    slug: selectedArticle?.slug || '',
    author: selectedArticle?.author || '',
    date: selectedArticle?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: selectedArticle?.category || 'Blog',
    image: selectedArticle?.image || '',
    imageCaption: selectedArticle?.imageCaption || '',
    excerpt: selectedArticle?.excerpt || '',
    content: selectedArticle?.content || '',
    featured: selectedArticle?.featured || false,
    tags: selectedArticle?.tags || []
  });
  
  // Reset form data when selected article changes
  useEffect(() => {
    if (selectedArticle) {
      setFormData({
        id: selectedArticle.id || '',
        title: selectedArticle.title || '',
        slug: selectedArticle.slug || '',
        author: selectedArticle.author || '',
        date: selectedArticle.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        category: selectedArticle.category || 'Blog',
        image: selectedArticle.image || '',
        imageCaption: selectedArticle.imageCaption || '',
        excerpt: selectedArticle.excerpt || '',
        content: selectedArticle.content || '',
        featured: selectedArticle.featured || false,
        tags: selectedArticle.tags || []
      });
      setSelectedTags(selectedArticle.tags || []);
    } else {
      setFormData({
        id: '',
        title: '',
        slug: '',
        author: '',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        category: 'Blog',
        image: '',
        imageCaption: '',
        excerpt: '',
        content: '',
        featured: false,
        tags: []
      });
      setSelectedTags([]);
    }
  }, [selectedArticle]);

  // Event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleTagsChange = (newTags: string[]) => {
    setSelectedTags(newTags);
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const handleImageChange = (imageData: string) => {
    setFormData(prev => ({ ...prev, image: imageData }));
  };

  const handleImageCaptionChange = (caption: string) => {
    setFormData(prev => ({ ...prev, imageCaption: caption }));
  };

  const handleSaveEditedImage = (editedImage: string) => {
    setFormData(prev => ({ ...prev, image: editedImage }));
    setIsImageEditorOpen(false);
    toast({
      title: 'Success',
      description: 'Image edited successfully.',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields (title, content)',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.slug) {
      formData.slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    if (!formData.id) {
      formData.id = Math.random().toString(36).substring(2, 15);
    }
    
    let updatedList;
    if (selectedArticle) {
      updatedList = articleList.map(article => 
        article.id === formData.id ? { ...formData as Article } : article
      );
      toast({
        title: 'Success',
        description: 'Article updated successfully',
      });
    } else {
      updatedList = [...articleList, formData as Article];
      toast({
        title: 'Success',
        description: 'New article created successfully',
      });
    }
    
    onArticleListUpdate(updatedList);
    localStorage.setItem('hlc-admin-articles', JSON.stringify(updatedList));
    
    if (!selectedArticle) {
      onNewArticle();
    }
  };

  const handleDelete = () => {
    if (!selectedArticle) return;
    
    if (confirm('Are you sure you want to delete this article?')) {
      const updatedList = articleList.filter(article => article.id !== selectedArticle.id);
      onArticleListUpdate(updatedList);
      localStorage.setItem('hlc-admin-articles', JSON.stringify(updatedList));
      
      onNewArticle();
      
      toast({
        title: 'Success',
        description: 'Article deleted successfully',
      });
    }
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
    handleImageCaptionChange,
    handleSaveEditedImage,
    handleSubmit,
    handleDelete
  };
};
