import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Download, Upload, Database } from 'lucide-react';
import { recordBackupPerformed } from '@/lib/utils/storage/backupStorage';
import { exportArticlesData } from '@/lib/utils/storage/exportStorage';
import { importArticlesData } from '@/lib/utils/storage/importStorage';

interface LocalBackupSectionProps {
  setDaysSinceBackup: (days: number) => void;
  onDataImported: () => void;
}

const LocalBackupSection: React.FC<LocalBackupSectionProps> = ({ 
  setDaysSinceBackup, 
  onDataImported 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = React.useState(false);

  const handleExport = (includeAll = false) => {
    try {
      exportArticlesData(includeAll);
      recordBackupPerformed();
      setDaysSinceBackup(0);
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
  );
};

export default LocalBackupSection;
