
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ArticleLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleLoading;
