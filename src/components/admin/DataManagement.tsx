
import React, { useState, useEffect } from 'react';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { getDaysSinceLastBackup, processScheduledArticles } from '@/lib/utils/storage/articleStorage';
import BackupRestoreTab from './data-management/BackupRestoreTab';

interface DataManagementProps {
  onDataImported: () => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ onDataImported }) => {
  const [daysSinceBackup, setDaysSinceBackup] = useState<number | null>(null);
  
  useEffect(() => {
    const days = getDaysSinceLastBackup();
    setDaysSinceBackup(days);
    
    processScheduledArticles();
    
    const intervalId = setInterval(() => {
      processScheduledArticles();
    }, 60000);
    
    return () => clearInterval(intervalId);
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
