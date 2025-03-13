
import React, { useState } from 'react';
import { Article } from '@/lib/types/article';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { X } from 'lucide-react';

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

  // Input handlers
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

  // Tag handlers
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

  const handleArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!articleFormData.title || !articleFormData.content || !articleFormData.author) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields (title, author, content)',
        variant: 'destructive',
      });
      return;
    }
    
    // Generate slug if empty
    if (!articleFormData.slug) {
      articleFormData.slug = articleFormData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    // Update or add article
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
    localStorage.setItem('admin-articles', JSON.stringify(updatedList));
  };

  const handleArticleDelete = () => {
    if (!selectedArticle) return;
    
    if (confirm('Are you sure you want to delete this article?')) {
      const updatedList = articleList.filter(article => article.id !== selectedArticle.id);
      onArticleListUpdate(updatedList);
      localStorage.setItem('admin-articles', JSON.stringify(updatedList));
      
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
        {selectedArticle ? 'Edit Article' : 'New Article'}
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
            <label className="text-sm font-medium">Author</label>
            <Input 
              name="author"
              value={articleFormData.author}
              onChange={handleArticleInputChange}
              placeholder="Author name"
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
            <label className="text-sm font-medium">Image URL</label>
            <Input 
              name="image"
              value={articleFormData.image}
              onChange={handleArticleInputChange}
              placeholder="https://example.com/image.jpg"
            />
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
    </div>
  );
};

export default ArticleForm;
