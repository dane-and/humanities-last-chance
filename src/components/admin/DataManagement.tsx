
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { exportArticlesData, importArticlesData } from '@/lib/utils/storage/dataExportImport';
import { toast } from 'sonner';
import { 
  Alert, 
  AlertDescription,
  AlertTitle 
} from "@/components/ui/alert";
import { Download, Upload, Info } from 'lucide-react';

interface DataManagementProps {
  onDataImported: () => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ onDataImported }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setImporting(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        if (importArticlesData(jsonData)) {
          toast.success('Articles imported successfully');
          onDataImported();
        } else {
          toast.error('Failed to import articles');
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
  
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-medium">Data Management</h3>
      
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
          onClick={exportArticlesData}
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
