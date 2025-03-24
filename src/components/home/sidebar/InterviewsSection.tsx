
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Article } from '@/lib/types/article';

interface InterviewsSectionProps {
  interviews: Article[];
}

const InterviewsSection: React.FC<InterviewsSectionProps> = ({ interviews }) => {
  return (
    <div className="space-y-4 bg-background border rounded-lg p-4">
      <div className="flex justify-between items-end mb-4">
        <h2 className="font-serif text-xl font-medium tracking-tight">
          Latest Interviews
        </h2>
        <Link
          to="/articles/interviews"
          className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {interviews.map((interview) => (
          <article key={interview.id} className="border-b border-border/30 pb-4 last:border-b-0 last:pb-0">
            {interview.image && (
              <div className="mb-3">
                <AspectRatio ratio={21 / 9} className="overflow-hidden rounded">
                  <Link to={`/article/${interview.slug}`}>
                    <div className="relative w-full h-full">
                      <img 
                        src={interview.image} 
                        alt={interview.title} 
                        className="w-full h-auto relative z-10 object-contain"
                      />
                      <div
                        className="absolute inset-0 blur-lg scale-105 z-0"
                        style={{ backgroundImage: `url(${interview.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                      />
                    </div>
                  </Link>
                </AspectRatio>
              </div>
            )}
            <h3 className="font-serif text-base font-medium mb-2">
              <Link 
                to={`/article/${interview.slug}`} 
                className="hover:text-primary/80 transition-colors"
              >
                {interview.title}
              </Link>
            </h3>
            <div className="text-xs text-muted-foreground">
              {interview.date}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default InterviewsSection;
