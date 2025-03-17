
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Custom hooks
import { useContentData } from '@/hooks/useContentData';

// Admin components
import AdminHeader from '@/components/admin/AdminHeader';
import DataManagement from '@/components/admin/DataManagement';
import ArticleManagement from '@/components/admin/dashboard/ArticleManagement';
import PageManagement from '@/components/admin/dashboard/PageManagement';

const AdminDashboard: React.FC = () => {
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
    console.log('AdminDashboard rendered, authentication bypassed temporarily');
  }, []);

  const handleLogout = () => {
    console.log('Logout requested from dashboard, but currently bypassed');
    // No actual logout functionality for now
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <AdminHeader onLogout={handleLogout} />
      
      <main className="container mx-auto p-4 mt-6">
        <div className="mb-6">
          <DataManagement onDataImported={loadData} />
        </div>
        
        {contentLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin text-primary">Loading...</div>
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
