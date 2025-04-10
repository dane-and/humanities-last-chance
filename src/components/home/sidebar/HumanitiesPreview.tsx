
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Course } from '@/lib/data/youtubeUniversity/types';

interface HumanitiesPreviewProps {
  featuredCourses: (Course & { disciplineName: string })[];
}

const HumanitiesPreview: React.FC<HumanitiesPreviewProps> = ({ featuredCourses }) => {
  return (
    <div className="space-y-4 bg-background border rounded-lg p-4 flex flex-col">
      <div className="mb-4">
        <h2 className="font-serif text-xl font-bold tracking-tight">
          Humanities Last Chance U
        </h2>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Check out our curated collection of high-quality lecture courses available for free.
      </p>
      
      <div className="mt-auto flex justify-center">
        <Button variant="link" asChild className="text-primary">
          <Link to="/resources?tab=humanities-u">
            View all
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HumanitiesPreview;
