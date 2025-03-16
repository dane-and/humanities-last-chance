
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Alert, 
  AlertDescription,
  AlertTitle 
} from "@/components/ui/alert";
import { Download, Upload, Info, Calendar, Cloud, Database } from 'lucide-react';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { 
  getArticlesFromStorage, 
  saveArticlesToStorage, 
  recordBackupPerformed,
  getDaysSinceLastBackup,
  processScheduledArticles
} from '@/lib/utils/storage/articleStorage';
import { exportArticlesData, importArticlesData, exportArticlesToCloud } from '@/lib/utils/storage/dataExportImport';
import AnalyticsDashboard from './AnalyticsDashboard';

interface DataManagementProps {
  onDataImported: () => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ onDataImported }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [daysSinceBackup, setDaysSinceBackup] = useState<number | null>(null);
  
  useEffect(() => {
    // Check when the last backup was performed
    const days = getDaysSinceLastBackup();
    setDaysSinceBackup(days);
    
    // Process any scheduled articles that need to be published
    processScheduledArticles();
    
    // Set up interval to check for scheduled articles periodically
    const intervalId = setInterval(() => {
      processScheduledArticles();
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleExport = (includeAll = false) => {
    try {
      exportArticlesData(includeAll);
      recordBackupPerformed(); // Record that a backup was performed
      setDaysSinceBackup(0); // Reset the backup days counter
      toast.success("Articles exported successfully");
    } catch (error) {
      console.error('Error exporting articles:', error);
      toast.error("Failed to export articles");
    }
  };
  
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setImporting(true);
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const jsonData = e.target?.result as string;
        const success = await importArticlesData(jsonData);
        
        if (success) {
          toast.success('Data imported successfully');
          onDataImported();
        } else {
          throw new Error('Import failed');
        }
      } catch (error) {
        toast.error('Invalid file format');
        console.error(error);
      } finally {
        setImporting(false);
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    
    reader.onerror = () => {
      toast.error('Error reading file');
      setImporting(false);
    };
    
    reader.readAsText(file);
  };
  
  // Function to connect to cloud services
  const handleCloudConnect = (service: 'dropbox' | 'gdrive') => {
    toast.info(`${service === 'dropbox' ? 'Dropbox' : 'Google Drive'} integration coming soon!`);
    
    // In a real implementation, we would redirect to OAuth flow
    // For now, just simulate a successful connection
    localStorage.setItem(`hlc-${service}-connected`, 'true');
  };
  
  // Function to backup to cloud
  const handleCloudBackup = async (service: 'dropbox' | 'gdrive') => {
    try {
      const success = await exportArticlesToCloud(service);
      
      if (success) {
        toast.success(`Backup to ${service === 'dropbox' ? 'Dropbox' : 'Google Drive'} successful`);
        recordBackupPerformed();
        setDaysSinceBackup(0);
      } else {
        throw new Error('Backup failed');
      }
    } catch (error) {
      toast.error(`Failed to backup to ${service === 'dropbox' ? 'Dropbox' : 'Google Drive'}`);
      console.error(error);
    }
  };
  
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
          {daysSinceBackup !== null && daysSinceBackup > 7 && (
            <Alert variant="warning" className="bg-yellow-50 text-yellow-800 border-yellow-200 mb-4">
              <Calendar className="h-4 w-4" />
              <AlertTitle>Backup Reminder</AlertTitle>
              <AlertDescription>
                It's been {daysSinceBackup} days since your last backup. Consider exporting your data now.
              </AlertDescription>
            </Alert>
          )}
          
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              This website uses browser storage to save your articles. Export your data regularly to avoid data loss when changing browsers or devices.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-md font-medium mb-3">Local Backup & Restore</h3>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleExport(false)}
                    className="flex gap-2 w-full"
                  >
                    <Download className="h-4 w-4" />
                    Export Published Articles
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => handleExport(true)}
                    className="flex gap-2 w-full"
                  >
                    <Database className="h-4 w-4" />
                    Export All Data
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={importing}
                    className="flex gap-2 w-full"
                  >
                    <Upload className="h-4 w-4" />
                    {importing ? 'Importing...' : 'Import Data'}
                  </Button>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImport}
                    accept=".json"
                    className="hidden"
                  />
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="text-md font-medium mb-3">Cloud Services</h3>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleCloudConnect('dropbox')}
                    className="flex gap-2 w-full"
                  >
                    <Cloud className="h-4 w-4" />
                    Connect to Dropbox
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleCloudBackup('dropbox')}
                    className="flex gap-2 w-full"
                  >
                    <Upload className="h-4 w-4" />
                    Backup to Dropbox
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleCloudConnect('gdrive')}
                    className="flex gap-2 w-full"
                  >
                    <Cloud className="h-4 w-4" />
                    Connect to Google Drive
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleCloudBackup('gdrive')}
                    className="flex gap-2 w-full"
                  >
                    <Upload className="h-4 w-4" />
                    Backup to Google Drive
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataManagement;
