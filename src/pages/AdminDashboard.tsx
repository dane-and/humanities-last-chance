
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { articles, Article } from '@/lib/articles';
import { Page, getPagesFromStorage, savePagesToStorage } from '@/lib/types/page';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { X } from 'lucide-react';

const PREDEFINED_TAGS = ['History', 'Literature', 'Philosophy', 'Teaching', 'News'];

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Articles state
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  
  // Pages state
  const [pageList, setPageList] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  
  // Form data
  const [articleFormData, setArticleFormData] = useState({
    id: '',
    title: '',
    slug: '',
    author: '',
    date: '',
    category: 'Blog',
    image: '',
    excerpt: '',
    content: '',
    featured: false,
    tags: [] as string[]
  });
  
  const [pageFormData, setPageFormData] = useState({
    id: '',
    title: '',
    slug: '',
    content: '',
    lastUpdated: '',
    isSystem: false
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
    
    // Load pages
    const pages = getPagesFromStorage();
    setPageList(pages);
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  // Article form handlers
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

  // Page form handlers
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPageFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePageEditorChange = (content: string) => {
    setPageFormData(prev => ({ ...prev, content }));
  };

  const handleArticleSelect = (id: string) => {
    const article = articleList.find(a => a.id === id);
    if (article) {
      setSelectedArticle(article);
      setArticleFormData({
        id: article.id,
        title: article.title,
        slug: article.slug,
        author: article.author,
        date: article.date,
        category: article.category,
        image: article.image,
        excerpt: article.excerpt || '',
        content: article.content,
        featured: article.featured || false,
        tags: article.tags || []
      });
      setSelectedTags(article.tags || []);
    }
  };
  
  const handlePageSelect = (id: string) => {
    const page = pageList.find(p => p.id === id);
    if (page) {
      setSelectedPage(page);
      setPageFormData({
        id: page.id,
        title: page.title,
        slug: page.slug,
        content: page.content,
        lastUpdated: page.lastUpdated,
        isSystem: page.isSystem || false
      });
    }
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

  const handleNewArticle = () => {
    setSelectedArticle(null);
    setSelectedTags([]);
    setArticleFormData({
      id: Date.now().toString(),
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
  };
  
  const handleNewPage = () => {
    setSelectedPage(null);
    setPageFormData({
      id: Date.now().toString(),
      title: '',
      slug: '',
      content: '',
      lastUpdated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      isSystem: false
    });
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
    
    setArticleList(updatedList);
    localStorage.setItem('admin-articles', JSON.stringify(updatedList));
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
    
    setPageList(updatedPages);
    savePagesToStorage(updatedPages);
  };

  const handleArticleDelete = () => {
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
      setPageList(updatedPages);
      savePagesToStorage(updatedPages);
      
      setSelectedPage(null);
      handleNewPage();
      
      toast({
        title: 'Success',
        description: 'Page deleted successfully',
      });
    }
  };

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
      
      <main className="container mx-auto p-4 mt-6">
        <Tabs defaultValue="articles">
          <TabsList className="mb-6">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
          </TabsList>
          
          {/* Articles Tab */}
          <TabsContent value="articles" className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
          </TabsContent>
          
          {/* Pages Tab */}
          <TabsContent value="pages" className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 bg-background p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Pages</h2>
                <Button size="sm" onClick={handleNewPage}>New</Button>
              </div>
              
              <div className="space-y-2 max-h-[70vh] overflow-y-auto">
                {pageList.map(page => (
                  <div 
                    key={page.id}
                    className={`p-2 rounded cursor-pointer hover:bg-muted ${selectedPage?.id === page.id ? 'bg-muted' : ''}`}
                    onClick={() => handlePageSelect(page.id)}
                  >
                    <div className="font-medium truncate">{page.title}</div>
                    <div className="text-xs text-muted-foreground">{page.lastUpdated}</div>
                    {page.isSystem && (
                      <div className="text-xs text-primary mt-1">System Page</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
