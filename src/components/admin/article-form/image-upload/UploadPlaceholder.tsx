
import React from 'react';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon } from 'lucide-react';

interface UploadPlaceholderProps {
  onClick: () => void;
}

const UploadPlaceholder: React.FC<UploadPlaceholderProps> = ({ onClick }) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-col items-center justify-center gap-2">
        <ImageIcon className="w-10 h-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Drag & drop an image here or
        </p>
        <Button type="button" variant="secondary" size="sm" onClick={onClick}>
          Choose file
        </Button>
      </div>
    </div>
  );
};

export default UploadPlaceholder;
