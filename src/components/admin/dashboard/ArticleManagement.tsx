
import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Article } from '@/lib/types/article';
import { toast } from 'sonner';
import ArticleList from '@/components/admin/ArticleList';
import ArticleForm from '@/components/admin/ArticleForm';
import { saveArticlesToStorage } from '@/lib/utils/storage/articleStorage';
import { publishDraftByTitle } from '@/lib/utils/storage/publishDraftStorage';

interface ArticleManagementProps {
  articleList: Article[];
  draftList: Article[];
  scheduledList: Article[];
  setArticleList: React.Dispatch<React.SetStateAction<Article[]>>;
  setDraftList: React.Dispatch<React.SetStateAction<Article[]>>;
  setScheduledList: React.Dispatch<React.SetStateAction<Article[]>>;
}

const ArticleManagement: React.FC<ArticleManagementProps> = ({
  articleList,
  draftList,
  scheduledList,
  setArticleList,
  setDraftList,
  setScheduledList
}) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeArticleTab, setActiveArticleTab] = useState('published');

  // Look for and publish the Hamlet draft automatically on component mount
  useEffect(() => {
    // Only run this once on initial load
    const published = localStorage.getItem('published-hamlet-draft');
    if (!published && draftList.length > 0) {
      const hamletDraftExists = draftList.some(
        draft => draft.title.toLowerCase() === 'should hamlet take prozac'
      );
      
      if (hamletDraftExists) {
        const success = publishDraftByTitle('Should Hamlet Take Prozac');
        if (success) {
          toast.success('"Should Hamlet Take Prozac" has been published!');
          localStorage.setItem('published-hamlet-draft', 'true');
          // Force a reload of the component
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      }
    }
  }, [draftList]);

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

  const handleNewArticle = () => {
    setSelectedArticle(null);
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

  // Use useMemo to prevent unnecessary re-calculations
  const activeArticleList = useMemo(() => {
    switch (activeArticleTab) {
      case 'drafts':
        return draftList;
      case 'scheduled':
        return scheduledList;
      case 'published':
      default:
        return articleList;
    }
  }, [activeArticleTab, articleList, draftList, scheduledList]);
  
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
    <Tabs value={activeArticleTab} onValueChange={setActiveArticleTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="published">Published</TabsTrigger>
        <TabsTrigger value="drafts">Drafts</TabsTrigger>
        <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
      </TabsList>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ArticleList 
          articleList={activeArticleList}
          selectedArticle={selectedArticle} 
          onArticleSelect={handleArticleSelect}
          onNewArticle={handleNewArticle}
          onDeleteArticle={handleDeleteArticle}
        />
        
        <ArticleForm 
          articleList={activeArticleList}
          selectedArticle={selectedArticle}
          onArticleListUpdate={handleArticleListUpdate}
          onNewArticle={handleNewArticle}
        />
      </div>
    </Tabs>
  );
};

export default ArticleManagement;
