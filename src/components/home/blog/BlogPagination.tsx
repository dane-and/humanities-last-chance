
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage
}) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-between items-center pt-8 mt-4">
      <Button
        variant="outline"
        onClick={prevPage}
        disabled={currentPage === 1}
        className="flex items-center gap-2 hover:bg-primary/5 focus:ring-2 focus:ring-primary/30"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Previous
      </Button>
      
      <div className="text-sm" aria-live="polite">
        Page {currentPage} of {totalPages}
      </div>
      
      <Button
        variant="outline"
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 hover:bg-primary/5 focus:ring-2 focus:ring-primary/30"
        aria-label="Next page"
      >
        Next
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
};

export default BlogPagination;
