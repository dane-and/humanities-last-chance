
import React, { useState, useEffect } from 'react';
import { getDaysSinceLastBackup, processScheduledArticles } from '@/lib/utils/storage/articleStorage';
import BackupRestoreTab from './data-management/BackupRestoreTab';
import { getArticlesFromStorage, saveArticlesToStorage } from '@/lib/utils/storage/articleStorage';

interface DataManagementProps {
  onDataImported: () => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ onDataImported }) => {
  const [daysSinceBackup, setDaysSinceBackup] = useState<number | null>(null);
  
  useEffect(() => {
    const days = getDaysSinceLastBackup();
    setDaysSinceBackup(days);
    
    // Process any scheduled articles that are due to be published
    processScheduledArticles();
    
    // Set up interval to check for scheduled articles
    const intervalId = setInterval(() => {
      processScheduledArticles();
    }, 60000); // Check every minute
    
    // Set up listener for article updates to ensure proper sorting
    const handleArticlesUpdated = () => {
      console.log("Articles updated, ensuring proper sorting");
      const articles = getArticlesFromStorage();
      saveArticlesToStorage(articles); // This will sort and save
    };
    
    window.addEventListener('articlesUpdated', handleArticlesUpdated);
    
    // Clean up on unmount
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('articlesUpdated', handleArticlesUpdated);
    };
  }, []);
  
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <BackupRestoreTab 
        daysSinceBackup={daysSinceBackup}
        setDaysSinceBackup={setDaysSinceBackup}
        onDataImported={onDataImported}
      />
    </div>
  );
};

export default DataManagement;
