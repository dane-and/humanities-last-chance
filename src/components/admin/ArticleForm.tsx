import React, { useState, useRef, useEffect } from 'react';
import { Article } from '@/lib/types/article';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { X, Upload, Image as ImageIcon, Edit2 } from 'lucide-react';
import ImageEditor from './ImageEditor';

const PREDEFINED_TAGS = ['History', 'Literature', 'Philosophy', 'Teaching', 'News'];

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
  const [customTag, setCustomTag] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      setArticleFormData(prev => ({ ...prev, tags: newTags }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = selectedTags.filter(t => t !== tag);
    setSelectedTags(newTags);
    setArticleFormData(prev => ({ ...prev, tags: newTags }));
  };

  const handleAddCustomTag = () => {
    if (customTag && customTag.trim() !== '' && !selectedTags.includes(customTag.trim())) {
      const newTag = customTag.trim();
      const newTags = [...selectedTags, newTag];
      setSelectedTags(newTags);
      setArticleFormData(prev => ({ ...prev, tags: newTags }));
      setCustomTag('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'The file must be an image.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image size should be less than 5MB.',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setArticleFormData(prev => ({ ...prev, image: e.target!.result as string }));
        toast({
          title: 'Success',
          description: 'Image uploaded successfully.',
        });
      }
    };
    reader.onerror = () => {
      toast({
        title: 'Error',
        description: 'Failed to read image file.',
        variant: 'destructive',
      });
    };
    reader.readAsDataURL(file);
  };

  const handleEditImage = () => {
    setIsImageEditorOpen(true);
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input 
              name="title"
              value={articleFormData.title}
              onChange={handleArticleInputChange}
              placeholder="Article title"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input 
              name="slug"
              value={articleFormData.slug}
              onChange={handleArticleInputChange}
              placeholder="url-friendly-slug (optional)"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Author (optional)</label>
            <Input 
              name="author"
              value={articleFormData.author}
              onChange={handleArticleInputChange}
              placeholder="Author name (optional)"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input 
              name="date"
              value={articleFormData.date}
              onChange={handleArticleInputChange}
              placeholder="Month DD, YYYY"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select 
              value={articleFormData.category} 
              onValueChange={(value) => handleArticleSelectChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Blog">Blog</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Resource">Resource</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Image</label>
            <div 
              className={`border border-dashed rounded-md p-4 text-center ${isDragging ? 'border-primary bg-primary/5' : 'border-input'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {articleFormData.image ? (
                <div className="space-y-2">
                  <div className="relative w-full h-32 mx-auto">
                    <img 
                      src={articleFormData.image} 
                      alt="Article preview" 
                      className="rounded-md w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={handleEditImage}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={handleClickUpload}>
                      <Upload className="w-4 h-4 mr-2" />
                      Change
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setArticleFormData(prev => ({ ...prev, image: '' }))}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="w-10 h-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop an image here or
                    </p>
                    <Button type="button" variant="secondary" size="sm" onClick={handleClickUpload}>
                      Choose file
                    </Button>
                  </div>
                </div>
              )}
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileInputChange}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Max size: 5MB. Recommended dimensions: 1200x800px.
            </p>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map(tag => (
                <div key={tag} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Select onValueChange={(value) => handleTagSelect(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  {PREDEFINED_TAGS.filter(tag => !selectedTags.includes(tag)).map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom tag"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddCustomTag}>Add</Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Excerpt</label>
            <Textarea 
              name="excerpt"
              value={articleFormData.excerpt}
              onChange={handleArticleInputChange}
              placeholder="Brief summary of the article"
              rows={2}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Content</label>
            <div className="border border-input rounded-md overflow-hidden">
              <ReactQuill 
                theme="snow"
                value={articleFormData.content}
                onChange={handleArticleEditorChange}
                modules={modules}
                formats={formats}
                placeholder="Write your article content here..."
                className="min-h-[300px] bg-background"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={articleFormData.featured}
              onChange={handleArticleCheckboxChange}
              className="rounded border-gray-300"
            />
            <label htmlFor="featured" className="text-sm font-medium">
              Featured Article
            </label>
          </div>
        </div>
        
        <div className="flex gap-4 justify-end">
          {selectedArticle && (
            <Button type="button" variant="destructive" onClick={handleArticleDelete}>
              Delete
            </Button>
          )}
          <Button type="submit">
            {selectedArticle ? 'Update' : 'Create'} Article
          </Button>
        </div>
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

