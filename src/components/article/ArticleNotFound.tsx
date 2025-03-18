
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ArticleNotFoundProps {
  onGoBack: () => void;
}

const ArticleNotFound: React.FC<ArticleNotFoundProps> = ({ onGoBack }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <p className="text-muted-foreground mb-6">Content will appear here once connected to Sanity CMS.</p>
          <Button onClick={onGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleNotFound;
