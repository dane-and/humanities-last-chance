
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { articles as defaultArticles, Article } from '@/lib/articles';
import { Page, getPagesFromStorage, savePagesToStorage } from '@/lib/types/page';
import { toast } from 'sonner';

// Admin components
import AdminHeader from '@/components/admin/AdminHeader';
import ArticleList from '@/components/admin/ArticleList';
import ArticleForm from '@/components/admin/ArticleForm';
import PageList from '@/components/admin/PageList';
import PageForm from '@/components/admin/PageForm';
import DataManagement from '@/components/admin/DataManagement';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // Articles state
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Pages state
  const [pageList, setPageList] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const loadData = () => {
    // Load articles from localStorage or use default
    const savedArticles = localStorage.getItem('hlc-articles');
    if (savedArticles) {
      try {
        setArticleList(JSON.parse(savedArticles));
      } catch (e) {
        console.error('Failed to parse articles from localStorage', e);
        setArticleList(defaultArticles);
        localStorage.setItem('hlc-articles', JSON.stringify(defaultArticles));
      }
    } else {
      setArticleList(defaultArticles);
      localStorage.setItem('hlc-articles', JSON.stringify(defaultArticles));
    }
    
    // Load pages
    const pages = getPagesFromStorage();
    setPageList(pages);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    
    loadData();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleArticleSelect = (id: string) => {
    const article = articleList.find(a => a.id === id);
    if (article) {
      setSelectedArticle(article);
    }
  };
  
  const handlePageSelect = (id: string) => {
    const page = pageList.find(p => p.id === id);
    if (page) {
      setSelectedPage(page);
    }
  };

  const handleNewArticle = () => {
    setSelectedArticle(null);
  };
  
  const handleNewPage = () => {
    setSelectedPage(null);
  };
  
  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updatedList = articleList.filter(article => article.id !== id);
      setArticleList(updatedList);
      localStorage.setItem('hlc-articles', JSON.stringify(updatedList));
      
      // If the deleted article was selected, clear the selection
      if (selectedArticle && selectedArticle.id === id) {
        setSelectedArticle(null);
      }
      
      toast.success("Article deleted successfully");
    }
  };
  
  const handleDeletePage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      const updatedList = pageList.filter(page => page.id !== id);
      setPageList(updatedList);
      savePagesToStorage(updatedList);
      
      // If the deleted page was selected, clear the selection
      if (selectedPage && selectedPage.id === id) {
        setSelectedPage(null);
      }
      
      toast.success("Page deleted successfully");
    }
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <AdminHeader onLogout={handleLogout} />
      
      <main className="container mx-auto p-4 mt-6">
        <div className="mb-6">
          <DataManagement onDataImported={loadData} />
        </div>
        
        <Tabs defaultValue="articles">
          <TabsList className="mb-6">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
          </TabsList>
          
          {/* Articles Tab */}
          <TabsContent value="articles" className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ArticleList 
              articleList={articleList} 
              selectedArticle={selectedArticle} 
              onArticleSelect={handleArticleSelect}
              onNewArticle={handleNewArticle}
              onDeleteArticle={handleDeleteArticle}
            />
            
            <ArticleForm 
              articleList={articleList}
              selectedArticle={selectedArticle}
              onArticleListUpdate={setArticleList}
              onNewArticle={handleNewArticle}
            />
          </TabsContent>
          
          {/* Pages Tab */}
          <TabsContent value="pages" className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <PageList 
              pageList={pageList}
              selectedPage={selectedPage}
              onPageSelect={handlePageSelect}
              onNewPage={handleNewPage}
              onDeletePage={handleDeletePage}
            />
            
            <PageForm 
              pageList={pageList}
              selectedPage={selectedPage}
              onPageListUpdate={setPageList}
              onNewPage={handleNewPage}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
