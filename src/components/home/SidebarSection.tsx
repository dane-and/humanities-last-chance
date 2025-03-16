
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { getArticlesByCategory } from '@/lib/articles';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import OptimizedImage from '@/components/OptimizedImage';
import { findCourse } from '@/components/resources/humanities/utils';

// Featured courses list
const featuredCourseTitles = [
  "Shakespeare After All: The Later Plays",
  "The Hebrew Bible",
  "The Human Brain",
  "Introduction to Theory of Literature",
  "World Economic History Before the Industrial Revolution"
];

const SidebarSection: React.FC = () => {
  // Get other content - limit to 2 most recent for sidebar
  const interviews = getArticlesByCategory('interview', 2);
  const reviews = getArticlesByCategory('review', 2);
  
  const [api, setApi] = useState<any>(null);
  
  // Get featured courses
  const featuredCourses = featuredCourseTitles
    .map(findCourse)
    .filter(course => course !== null);
  
  // Setup auto rotation for carousel
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [api]);
  
  return (
    <div className="space-y-8 sticky top-4">
      {/* Interviews Section */}
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
                      <img 
                        src={interview.image} 
                        alt={interview.title} 
                        className="w-full h-full object-cover"
                      />
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
      
      {/* Reviews Section */}
      <div className="space-y-4 bg-background border rounded-lg p-4">
        <div className="flex justify-between items-end mb-4">
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
        
        <div className="space-y-4">
          {reviews.map((review) => (
            <article key={review.id} className="border-b border-border/30 pb-4 last:border-b-0 last:pb-0">
              {review.image && (
                <div className="mb-3">
                  <AspectRatio ratio={21 / 9} className="overflow-hidden rounded">
                    <Link to={`/article/${review.slug}`}>
                      <img 
                        src={review.image} 
                        alt={review.title} 
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </AspectRatio>
                </div>
              )}
              <h3 className="font-serif text-base font-medium mb-2">
                <Link 
                  to={`/article/${review.slug}`} 
                  className="hover:text-primary/80 transition-colors"
                >
                  {review.title}
                </Link>
              </h3>
              <div className="text-xs text-muted-foreground">
                {review.date}
              </div>
            </article>
          ))}
        </div>
      </div>
      
      {/* Humanities Last Chance U Section */}
      <div className="space-y-4 bg-background border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="h-5 w-5 text-primary" />
          <h2 className="font-serif text-xl font-medium tracking-tight">
            Humanities Last Chance U
          </h2>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Check out our curated collection of high-quality lecture courses available for free.
        </p>
        
        {featuredCourses.length > 0 && (
          <Carousel
            className="w-full" 
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1
            }}
            setApi={setApi}
          >
            <CarouselContent>
              {featuredCourses.map((course) => {
                if (!course) return null;
                
                // Get thumbnail URL from the course
                const thumbnailUrl = course.link.includes('youtube.com') || course.link.includes('youtu.be') 
                  ? `https://img.youtube.com/vi/${course.link.split('v=')[1]?.split('&')[0] || course.link.split('/').pop()}/mqdefault.jpg`
                  : '/placeholder.svg';
                
                return (
                  <CarouselItem key={course.id} className="basis-full">
                    <a 
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="block"
                    >
                      <div className="relative rounded-lg overflow-hidden">
                        <AspectRatio ratio={16/9}>
                          <OptimizedImage 
                            src={thumbnailUrl} 
                            alt={`Thumbnail for ${course.title}`}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        </AspectRatio>
                        
                        {/* Overlay with gradient and text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-3">
                          <h4 className="text-white font-medium text-sm mb-1 line-clamp-2">{course.title}</h4>
                          <p className="text-white/90 text-xs mb-1">
                            {course.instructor}
                          </p>
                        </div>
                      </div>
                    </a>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        )}
        
        <div className="mt-4">
          <Link
            to="/resources?tab=humanities-u"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all courses
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarSection;

