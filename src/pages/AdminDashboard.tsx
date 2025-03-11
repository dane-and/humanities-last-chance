
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { articles, Article } from '@/lib/articles';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    author: '',
    date: '',
    category: 'Blog',
    image: '',
    excerpt: '',
    content: '',
    featured: false
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
    
    // Load articles from localStorage or use default
    const savedArticles = localStorage.getItem('admin-articles');
    if (savedArticles) {
      setArticleList(JSON.parse(savedArticles));
    } else {
      setArticleList(articles);
      localStorage.setItem('admin-articles', JSON.stringify(articles));
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleArticleSelect = (id: string) => {
    const article = articleList.find(a => a.id === id);
    if (article) {
      setSelectedArticle(article);
      setFormData({
        id: article.id,
        title: article.title,
        slug: article.slug,
        author: article.author,
        date: article.date,
        category: article.category,
        image: article.image,
        excerpt: article.excerpt || '',
        content: article.content,
        featured: article.featured || false
      });
    }
  };

  const handleNewArticle = () => {
    setSelectedArticle(null);
    setFormData({
      id: Date.now().toString(),
      title: '',
      slug: '',
      author: '',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      category: 'Blog',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3',
      excerpt: '',
      content: '',
      featured: false
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.title || !formData.content || !formData.author) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields (title, author, content)',
        variant: 'destructive',
      });
      return;
    }
    
    // Generate slug if empty
    if (!formData.slug) {
      formData.slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    // Update or add article
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
    
    setArticleList(updatedList);
    localStorage.setItem('admin-articles', JSON.stringify(updatedList));
  };

  const handleDelete = () => {
    if (!selectedArticle) return;
    
    if (confirm('Are you sure you want to delete this article?')) {
      const updatedList = articleList.filter(article => article.id !== selectedArticle.id);
      setArticleList(updatedList);
      localStorage.setItem('admin-articles', JSON.stringify(updatedList));
      
      setSelectedArticle(null);
      handleNewArticle();
      
      toast({
        title: 'Success',
        description: 'Article deleted successfully',
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-background border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Content Management</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              View Site
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="md:col-span-1 bg-background p-4 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Articles</h2>
            <Button size="sm" onClick={handleNewArticle}>New</Button>
          </div>
          
          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            {articleList.map(article => (
              <div 
                key={article.id}
                className={`p-2 rounded cursor-pointer hover:bg-muted ${selectedArticle?.id === article.id ? 'bg-muted' : ''}`}
                onClick={() => handleArticleSelect(article.id)}
              >
                <div className="font-medium truncate">{article.title}</div>
                <div className="text-xs text-muted-foreground">{article.date}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-3 bg-background p-6 rounded-lg border">
          <h2 className="text-xl font-bold mb-4">
            {selectedArticle ? 'Edit Article' : 'New Article'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Article title"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>
                <Input 
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="url-friendly-slug (optional)"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Author</label>
                <Input 
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Author name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input 
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="Month DD, YYYY"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blog">Blog</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input 
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Excerpt</label>
                <Textarea 
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief summary of the article"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Content (HTML)</label>
                <Textarea 
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Article content in HTML format"
                  rows={10}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleCheckboxChange}
                  className="rounded border-gray-300"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured Article
                </label>
              </div>
            </div>
            
            <div className="flex gap-4 justify-end">
              {selectedArticle && (
                <Button type="button" variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              )}
              <Button type="submit">
                {selectedArticle ? 'Update' : 'Create'} Article
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
