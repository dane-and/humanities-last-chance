
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share, FileJson, FileArchive } from 'lucide-react';
import { exportArticlesData } from '@/lib/utils/storage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ExportButton = () => {
  const [open, setOpen] = useState(false);
  
  const handleExportJson = () => {
    exportArticlesData(true);
    setOpen(false);
  };
  
  const handleExportZip = () => {
    // Create a link to download the project ZIP file
    const downloadLink = document.createElement('a');
    downloadLink.href = '/api/export-project-zip.php';
    downloadLink.download = `humanities-project-${new Date().toISOString().slice(0,10)}.zip`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Share className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Site Content</DialogTitle>
          <DialogDescription>
            Download your site content or the complete project files.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            Choose the type of export you want to perform:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={handleExportJson}
              className="flex items-center gap-2"
            >
              <FileJson className="h-4 w-4" />
              Content JSON
            </Button>
            <Button 
              onClick={handleExportZip}
              className="flex items-center gap-2"
            >
              <FileArchive className="h-4 w-4" />
              Complete ZIP
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportButton;
