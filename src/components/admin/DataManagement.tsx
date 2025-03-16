
import React, { useState, useEffect } from 'react';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { getDaysSinceLastBackup, processScheduledArticles } from '@/lib/utils/storage/articleStorage';
import AnalyticsDashboard from './AnalyticsDashboard';
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
      <Tabs defaultValue="analytics">
        <TabsList className="mb-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
        
        <TabsContent value="backup">
          <BackupRestoreTab 
            daysSinceBackup={daysSinceBackup}
            setDaysSinceBackup={setDaysSinceBackup}
            onDataImported={onDataImported}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataManagement;
