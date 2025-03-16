
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Custom hooks
import { useContentData } from '@/hooks/useContentData';

// Admin components
import AdminHeader from '@/components/admin/AdminHeader';
import DataManagement from '@/components/admin/DataManagement';
import ArticleManagement from '@/components/admin/dashboard/ArticleManagement';
import PageManagement from '@/components/admin/dashboard/PageManagement';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // Get content data using our custom hook
  const { 
    articleList, 
    draftList, 
    scheduledList, 
    pageList,
    setArticleList,
    setDraftList,
    setScheduledList,
    setPageList,
    loadData
  } = useContentData();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
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
            <ArticleManagement
              articleList={articleList}
              draftList={draftList}
              scheduledList={scheduledList}
              setArticleList={setArticleList}
              setDraftList={setDraftList}
              setScheduledList={setScheduledList}
            />
          </TabsContent>
          
          {/* Pages Tab */}
          <TabsContent value="pages">
            <PageManagement 
              pageList={pageList}
              setPageList={setPageList}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
