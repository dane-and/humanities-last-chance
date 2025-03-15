
import React, { useState, useEffect } from 'react';
import { Article } from '@/lib/types/article';
import { useToast } from '@/hooks/use-toast';
import ImageEditor from './ImageEditor';

// Import refactored components
import {
  BasicInfoFields,
  ImageUploadField,
  TagsField,
  ContentField,
  FeaturedToggle,
  FormActions
} from './article-form';

interface ArticleFormProps {
  articleList: Article[];
  selectedArticle: Article | null;
  onArticleListUpdate: (updatedList: Article[]) => void;
  onNewArticle: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ 
  articleList, 
  selectedArticle, 
  onArticleListUpdate, 
  onNewArticle 
}) => {
  const { toast } = useToast();
  const [selectedTags, setSelectedTags] = useState<string[]>(selectedArticle?.tags || []);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
  
  const [articleFormData, setArticleFormData] = useState({
    id: selectedArticle?.id || '',
    title: selectedArticle?.title || '',
    slug: selectedArticle?.slug || '',
    author: selectedArticle?.author || '',
    date: selectedArticle?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: selectedArticle?.category || 'Blog',
    image: selectedArticle?.image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3',
    excerpt: selectedArticle?.excerpt || '',
    content: selectedArticle?.content || '',
    featured: selectedArticle?.featured || false,
    tags: selectedArticle?.tags || []
  });
  
  // Reset form data when selected article changes
  useEffect(() => {
    if (selectedArticle) {
      setArticleFormData({
        id: selectedArticle.id || '',
        title: selectedArticle.title || '',
        slug: selectedArticle.slug || '',
        author: selectedArticle.author || '',
        date: selectedArticle.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        category: selectedArticle.category || 'Blog',
        image: selectedArticle.image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3',
        excerpt: selectedArticle.excerpt || '',
        content: selectedArticle.content || '',
        featured: selectedArticle.featured || false,
        tags: selectedArticle.tags || []
      });
      setSelectedTags(selectedArticle.tags || []);
    } else {
      setArticleFormData({
        id: '',
        title: '',
        slug: '',
        author: '',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        category: 'Blog',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3',
        excerpt: '',
        content: '',
        featured: false,
        tags: []
      });
      setSelectedTags([]);
    }
  }, [selectedArticle]);

  // Event handlers
  const handleArticleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticleFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArticleEditorChange = (content: string) => {
    setArticleFormData(prev => ({ ...prev, content }));
  };

  const handleArticleSelectChange = (name: string, value: string) => {
    setArticleFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArticleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setArticleFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleTagsChange = (newTags: string[]) => {
    setSelectedTags(newTags);
    setArticleFormData(prev => ({ ...prev, tags: newTags }));
  };

  const handleImageChange = (imageData: string) => {
    setArticleFormData(prev => ({ ...prev, image: imageData }));
  };

  const handleSaveEditedImage = (editedImage: string) => {
    setArticleFormData(prev => ({ ...prev, image: editedImage }));
    setIsImageEditorOpen(false);
    toast({
      title: 'Success',
      description: 'Image edited successfully.',
    });
  };

  const handleArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!articleFormData.title || !articleFormData.content) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields (title, content)',
        variant: 'destructive',
      });
      return;
    }
    
    if (!articleFormData.slug) {
      articleFormData.slug = articleFormData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    if (!articleFormData.id) {
      articleFormData.id = Math.random().toString(36).substring(2, 15);
    }
    
    let updatedList;
    if (selectedArticle) {
      updatedList = articleList.map(article => 
        article.id === articleFormData.id ? { ...articleFormData as Article } : article
      );
      toast({
        title: 'Success',
        description: 'Article updated successfully',
      });
    } else {
      updatedList = [...articleList, articleFormData as Article];
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

  const handleArticleDelete = () => {
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

  return (
    <div className="md:col-span-3 bg-background p-6 rounded-lg border">
      <h2 className="text-xl font-bold mb-4">
        {selectedArticle ? `Edit Article: ${selectedArticle.title}` : 'New Article'}
      </h2>
      
      <form onSubmit={handleArticleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BasicInfoFields
            title={articleFormData.title}
            slug={articleFormData.slug}
            author={articleFormData.author || ''}
            date={articleFormData.date}
            category={articleFormData.category}
            onInputChange={handleArticleInputChange}
            onSelectChange={handleArticleSelectChange}
          />
          
          <ImageUploadField
            image={articleFormData.image}
            onImageChange={handleImageChange}
            onEditRequest={() => setIsImageEditorOpen(true)}
          />
          
          <TagsField
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
          />
          
          <ContentField
            excerpt={articleFormData.excerpt}
            content={articleFormData.content}
            onExcerptChange={handleArticleInputChange}
            onContentChange={handleArticleEditorChange}
          />
          
          <FeaturedToggle
            featured={articleFormData.featured || false}
            onFeaturedChange={handleArticleCheckboxChange}
          />
        </div>
        
        <FormActions
          isEditing={!!selectedArticle}
          onDelete={handleArticleDelete}
        />
      </form>
      
      {isImageEditorOpen && (
        <ImageEditor
          image={articleFormData.image}
          onSave={handleSaveEditedImage}
          isOpen={isImageEditorOpen}
          onClose={() => setIsImageEditorOpen(false)}
        />
      )}
    </div>
  );
};

export default ArticleForm;
