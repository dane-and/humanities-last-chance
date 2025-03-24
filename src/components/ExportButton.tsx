
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
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
  
  const handleExport = () => {
    exportArticlesData(true);
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
            Download your site content as a JSON file that can be used elsewhere.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            This will export all published articles, drafts, and scheduled content as a JSON file.
          </p>
          <Button onClick={handleExport} className="self-end">
            Download JSON
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportButton;
