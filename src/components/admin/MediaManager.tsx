
import React, { useState, useRef } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Image, 
  Folder, 
  Upload, 
  X, 
  File, 
  FileImage,
  PlusCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface MediaFile {
  id: string;
  name: string;
  type: string;
  url: string;
  dateAdded: string;
  size?: number;
}

const MediaManager: React.FC = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(() => {
    // Try to load from localStorage
    try {
      const saved = localStorage.getItem('hlc-media-files');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading media files from localStorage:', e);
    }
    return [];
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    // Process each file
    Array.from(files).forEach(file => {
      // Create a FileReader
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          // Create a new media file entry
          const newFile: MediaFile = {
            id: crypto.randomUUID(),
            name: file.name,
            type: file.type,
            url: e.target.result as string,
            dateAdded: new Date().toISOString(),
            size: file.size
          };
          
          setMediaFiles(prev => {
            const updated = [...prev, newFile];
            // Save to localStorage
            localStorage.setItem('hlc-media-files', JSON.stringify(updated));
            return updated;
          });
        }
      };
      
      reader.onerror = () => {
        toast.error(`Failed to upload ${file.name}`);
      };
      
      // Read the file as a data URL
      reader.readAsDataURL(file);
    });
    
    setIsUploading(false);
    toast.success('Files uploaded successfully');
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleDelete = (id: string) => {
    setMediaFiles(prev => {
      const updated = prev.filter(file => file.id !== id);
      // Save to localStorage
      localStorage.setItem('hlc-media-files', JSON.stringify(updated));
      return updated;
    });
    toast.success('File deleted');
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <FileImage className="h-4 w-4" />
          Media Library
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Media Library</SheetTitle>
          <SheetDescription>
            Manage your uploaded images and files
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex gap-2"
            >
              <Upload className="h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Upload New File'}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
              multiple
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            {mediaFiles.length === 0 ? (
              <div className="col-span-2 flex flex-col items-center justify-center p-8 border border-dashed rounded-md">
                <FileImage className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No media files yet</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Files
                </Button>
              </div>
            ) : (
              mediaFiles.map(file => (
                <div key={file.id} className="relative group border rounded-md p-2">
                  <div className="aspect-square overflow-hidden bg-gray-100 rounded-md mb-2">
                    {file.type.startsWith('image/') ? (
                      <img 
                        src={file.url} 
                        alt={file.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <File className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="text-xs truncate">{file.name}</div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(file.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MediaManager;
