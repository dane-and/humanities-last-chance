
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

// Custom hooks
import { useContentData } from '@/hooks/useContentData';

// Admin components
import AdminHeader from '@/components/admin/AdminHeader';
import DataManagement from '@/components/admin/DataManagement';
import ArticleManagement from '@/components/admin/dashboard/ArticleManagement';
import PageManagement from '@/components/admin/dashboard/PageManagement';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, authLoading, logout } = useAuth();
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
    loadData,
    isLoading: contentLoading
  } = useContentData();

  useEffect(() => {
    console.log('AdminDashboard rendered, authentication status:', { isAuthenticated, authLoading });
    
    if (!authLoading && !isAuthenticated) {
      console.log('Not authenticated in dashboard, redirecting to login');
      navigate('/admin');
    } else if (!authLoading && isAuthenticated) {
      console.log('User is authenticated, dashboard access granted');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleLogout = () => {
    console.log('Logout requested from dashboard');
    logout();
    navigate('/admin');
  };

  // If still checking auth or not authenticated, show loading
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Verifying access...</span>
      </div>
    );
  }

  // If not authenticated, don't render anything to avoid flash of content
  if (!isAuthenticated) {
    console.log('Preventing dashboard render - not authenticated');
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <AdminHeader onLogout={handleLogout} />
      
      <main className="container mx-auto p-4 mt-6">
        <div className="mb-6">
          <DataManagement onDataImported={loadData} />
        </div>
        
        {contentLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading content data...</span>
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
