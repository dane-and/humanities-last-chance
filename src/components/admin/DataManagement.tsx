
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Alert, 
  AlertDescription,
  AlertTitle 
} from "@/components/ui/alert";
import { Download, Upload, Info, Calendar, Cloud } from 'lucide-react';
import { 
  getArticlesFromStorage, 
  saveArticlesToStorage, 
  recordBackupPerformed,
  getDaysSinceLastBackup 
} from '@/lib/utils/storage/articleStorage';
import { exportArticlesData, importArticlesData } from '@/lib/utils/storage/dataExportImport';

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
  }, []);
  
  const handleExport = () => {
    try {
      exportArticlesData();
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
          toast.success('Articles imported successfully');
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
  
  // Function to connect to Dropbox (placeholder - would require Dropbox API integration)
  const handleConnectToDropbox = () => {
    toast.info("Dropbox integration coming soon! This feature will allow automatic backups.");
    // This would be implemented with the Dropbox API
  };
  
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-medium">Data Management</h3>
      
      {daysSinceBackup !== null && daysSinceBackup > 7 && (
        <Alert variant="warning" className="bg-yellow-50 text-yellow-800 border-yellow-200">
          <Calendar className="h-4 w-4" />
          <AlertTitle>Backup Reminder</AlertTitle>
          <AlertDescription>
            It's been {daysSinceBackup} days since your last backup. Consider exporting your data now.
          </AlertDescription>
        </Alert>
      )}
      
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          This website uses browser storage to save your articles. Export your data regularly to avoid data loss when changing browsers or devices.
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="outline" 
          onClick={handleExport}
          className="flex gap-2"
        >
          <Download className="h-4 w-4" />
          Export Articles
        </Button>
        
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={importing}
          className="flex gap-2"
        >
          <Upload className="h-4 w-4" />
          {importing ? 'Importing...' : 'Import Articles'}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleConnectToDropbox}
          className="flex gap-2"
        >
          <Cloud className="h-4 w-4" />
          Connect to Dropbox
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
  );
};

export default DataManagement;
