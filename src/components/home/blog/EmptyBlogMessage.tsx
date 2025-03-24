
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const EmptyBlogMessage: React.FC = () => {
  return (
    <Alert className="my-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>No articles found</AlertTitle>
      <AlertDescription>
        There are currently no articles available. Please check back later for new content.
      </AlertDescription>
    </Alert>
  );
};

export default EmptyBlogMessage;
