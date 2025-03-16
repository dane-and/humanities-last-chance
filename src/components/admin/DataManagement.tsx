
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Alert, 
  AlertDescription,
  AlertTitle 
} from "@/components/ui/alert";
import { Download, Upload, Info } from 'lucide-react';
import { getArticlesFromStorage, saveArticlesToStorage } from '@/lib/utils/storage/articleStorage';

interface DataManagementProps {
  onDataImported: () => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ onDataImported }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  
  const handleExport = () => {
    try {
      const articles = getArticlesFromStorage();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(articles, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `humanities-last-chance-articles-${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
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
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const articles = JSON.parse(jsonData);
        
        if (Array.isArray(articles)) {
          saveArticlesToStorage(articles);
          toast.success('Articles imported successfully');
          onDataImported();
        } else {
          throw new Error('Invalid data format');
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
