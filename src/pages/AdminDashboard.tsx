
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Article } from '@/lib/types/article';
import { Page, getPagesFromStorage, savePagesToStorage } from '@/lib/types/page';
import { toast } from 'sonner';

// Storage utilities
import { 
  getArticlesFromStorage, 
  saveArticlesToStorage,
  getDraftsFromStorage,
  getScheduledFromStorage,
  processScheduledArticles
} from '@/lib/utils/storage/articleStorage';

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
  const [draftList, setDraftList] = useState<Article[]>([]);
  const [scheduledList, setScheduledList] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeArticleTab, setActiveArticleTab] = useState('published');
  
  // Pages state
  const [pageList, setPageList] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const loadData = () => {
    // Load all content data from storage
    const published = getArticlesFromStorage();
    const drafts = getDraftsFromStorage();
    const scheduled = getScheduledFromStorage();
    const pages = getPagesFromStorage();
    
    setArticleList(published);
    setDraftList(drafts);
    setScheduledList(scheduled);
    setPageList(pages);
    
    // Process any scheduled articles
    processScheduledArticles();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    
    loadData();
    
    // Set up interval to process scheduled articles
    const intervalId = setInterval(() => {
      processScheduledArticles();
      loadData(); // Reload data after processing
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleArticleSelect = (id: string) => {
    // Look in the appropriate list based on the active tab
    let article = null;
    
    switch (activeArticleTab) {
      case 'published':
        article = articleList.find(a => a.id === id);
        break;
      case 'drafts':
        article = draftList.find(a => a.id === id);
        break;
      case 'scheduled':
        article = scheduledList.find(a => a.id === id);
        break;
    }
    
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
      let targetList: Article[];
      let setTargetList: React.Dispatch<React.SetStateAction<Article[]>>;
      let storageFunction: (articles: Article[]) => void;
      
      // Determine which list to update based on active tab
      switch (activeArticleTab) {
        case 'published':
          targetList = articleList;
          setTargetList = setArticleList;
          storageFunction = saveArticlesToStorage;
          break;
        case 'drafts':
          targetList = draftList;
          setTargetList = setDraftList;
          storageFunction = articles => localStorage.setItem('hlc-drafts', JSON.stringify(articles));
          break;
        case 'scheduled':
          targetList = scheduledList;
          setTargetList = setScheduledList;
          storageFunction = articles => localStorage.setItem('hlc-scheduled', JSON.stringify(articles));
          break;
        default:
          return;
      }
      
      const updatedList = targetList.filter(article => article.id !== id);
      setTargetList(updatedList);
      storageFunction(updatedList);
      
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
  
  // Return the correct article list based on active tab
  const getActiveArticleList = () => {
    switch (activeArticleTab) {
      case 'drafts':
        return draftList;
      case 'scheduled':
        return scheduledList;
      case 'published':
      default:
        return articleList;
    }
  };
  
  // Handle article list updates based on active tab
  const handleArticleListUpdate = (updatedList: Article[]) => {
    switch (activeArticleTab) {
      case 'drafts':
        setDraftList(updatedList);
        localStorage.setItem('hlc-drafts', JSON.stringify(updatedList));
        break;
      case 'scheduled':
        setScheduledList(updatedList);
        localStorage.setItem('hlc-scheduled', JSON.stringify(updatedList));
        break;
      case 'published':
      default:
        setArticleList(updatedList);
        saveArticlesToStorage(updatedList);
        break;
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
          <TabsContent value="articles">
            <Tabs value={activeArticleTab} onValueChange={setActiveArticleTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ArticleList 
                  articleList={getActiveArticleList()} 
                  selectedArticle={selectedArticle} 
                  onArticleSelect={handleArticleSelect}
                  onNewArticle={handleNewArticle}
                  onDeleteArticle={handleDeleteArticle}
                />
                
                <ArticleForm 
                  articleList={getActiveArticleList()}
                  selectedArticle={selectedArticle}
                  onArticleListUpdate={handleArticleListUpdate}
                  onNewArticle={handleNewArticle}
                />
              </div>
            </Tabs>
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
