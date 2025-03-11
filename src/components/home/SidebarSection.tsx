
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getArticlesByCategory } from '@/lib/articles';

const SidebarSection: React.FC = () => {
  // Get other content - limit to 2 most recent for sidebar
  const interviews = getArticlesByCategory('interview', 2);
  const reviews = getArticlesByCategory('review', 2);
  
  return (
    <div className="lg:w-1/3 space-y-10 mt-10 lg:mt-0">
      {/* Interviews Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
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
        
        <div className="space-y-6">
          {interviews.map((interview) => (
            <article key={interview.id} className="border-b border-border/30 pb-4">
              {interview.image && (
                <Link to={`/article/${interview.slug}`}>
                  <img 
                    src={interview.image} 
                    alt={interview.title} 
                    className="w-full h-40 object-cover mb-3 rounded"
                  />
                </Link>
              )}
              <h3 className="font-serif text-lg font-medium mb-2">
                <Link 
                  to={`/article/${interview.slug}`} 
                  className="hover:text-primary/80 transition-colors"
                >
                  {interview.title}
                </Link>
              </h3>
              <div className="text-sm text-muted-foreground">
                {interview.date}
              </div>
            </article>
          ))}
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="font-serif text-xl font-medium tracking-tight">
            Latest Reviews
          </h2>
          <Link
            to="/articles/reviews"
            className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="space-y-6">
          {reviews.map((review) => (
            <article key={review.id} className="border-b border-border/30 pb-4">
              {review.image && (
                <Link to={`/article/${review.slug}`}>
                  <img 
                    src={review.image} 
                    alt={review.title} 
                    className="w-full h-40 object-cover mb-3 rounded"
                  />
                </Link>
              )}
              <h3 className="font-serif text-lg font-medium mb-2">
                <Link 
                  to={`/article/${review.slug}`} 
                  className="hover:text-primary/80 transition-colors"
                >
                  {review.title}
                </Link>
              </h3>
              <div className="text-sm text-muted-foreground">
                {review.date}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarSection;
