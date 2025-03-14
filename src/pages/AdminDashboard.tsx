
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { articles, Article } from '@/lib/articles';
import { Page, getPagesFromStorage } from '@/lib/types/page';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  // Articles state
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Pages state
  const [pageList, setPageList] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const loadData = () => {
    // Load articles from localStorage or use default
    const savedArticles = localStorage.getItem('hlc-admin-articles');
    if (savedArticles) {
      setArticleList(JSON.parse(savedArticles));
    } else {
      setArticleList(articles);
      localStorage.setItem('hlc-admin-articles', JSON.stringify(articles));
    }
    
    // Load pages
    const pages = getPagesFromStorage();
    setPageList(pages);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
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
    const updatedList = articleList.filter(article => article.id !== id);
    setArticleList(updatedList);
    localStorage.setItem('hlc-admin-articles', JSON.stringify(updatedList));
    
    // If the deleted article was selected, clear the selection
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle(null);
    }
    
    toast({
      title: "Article Deleted",
      description: "The article has been successfully deleted.",
    });
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
