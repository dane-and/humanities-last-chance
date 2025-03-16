
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Course } from '@/lib/data/youtubeUniversity/types';

interface HumanitiesPreviewProps {
  featuredCourses: (Course & { disciplineName: string })[];
}

const HumanitiesPreview: React.FC<HumanitiesPreviewProps> = ({ featuredCourses }) => {
  return (
    <div className="space-y-4 bg-background border rounded-lg p-4">
      <div className="flex justify-between items-end mb-4">
        <h2 className="font-serif text-xl font-medium tracking-tight">
          Humanities Last Chance U
        </h2>
        <Link
          to="/resources?tab=humanities-u"
          className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Check out our curated collection of high-quality lecture courses available for free.
      </p>
      
      <div className="space-y-4">
        {featuredCourses.slice(0, 3).map((course) => (
          <article key={course.id} className="border-b border-border/30 pb-4 last:border-b-0 last:pb-0">
            <h3 className="font-serif text-base font-medium mb-2">
              <a 
                href={course.link}
                target="_blank"
                rel="noopener noreferrer" 
                className="hover:text-primary/80 transition-colors"
              >
                {course.title}
              </a>
            </h3>
            <div className="text-xs text-muted-foreground">
              {course.instructor}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default HumanitiesPreview;
