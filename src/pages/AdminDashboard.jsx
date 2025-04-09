
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'sonner';

// Custom hooks
import { useContentData } from '@/hooks/useContentData';

// Admin components
import AdminHeader from '@/components/admin/AdminHeader';
import DataManagement from '@/components/admin/DataManagement';
import ArticleManagement from '@/components/admin/dashboard/ArticleManagement';
import PageManagement from '@/components/admin/dashboard/PageManagement';

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-md">
      <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong:</h3>
      <pre className="text-sm bg-white p-3 rounded border border-red-100 overflow-auto max-h-48 mb-4">
        {error.message}
      </pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
};

const AdminDashboard = () => {
  const [isReady, setIsReady] = useState(false);
  
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
    // Set ready after component mounts to avoid hydration issues
    setIsReady(true);
  }, []);

  const handleLogout = () => {
    console.log('Logout requested from dashboard, but currently bypassed');
    // No actual logout functionality for now
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin text-primary">Loading...</div>
        <span className="ml-2">Initializing dashboard...</span>
      </div>
    );
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
            <div className="h-8 w-8 animate-spin text-primary">Loading...</div>
            <span className="ml-2">Loading content data...</span>
          </div>
        ) : (
          <ErrorBoundary 
            FallbackComponent={ErrorFallback} 
            onReset={() => {
              // Reset the state when the error boundary is reset
              loadData();
            }}
            onError={(error) => {
              console.error("Error in admin dashboard:", error);
              toast.error("An error occurred. Please try again.");
            }}
          >
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
          </ErrorBoundary>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
