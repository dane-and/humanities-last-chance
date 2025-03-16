
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { Course } from '@/lib/data/youtubeUniversity/types';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import OptimizedImage from '@/components/OptimizedImage';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

interface HumanitiesPreviewProps {
  featuredCourses: (Course & { disciplineName: string })[];
}

const HumanitiesPreview: React.FC<HumanitiesPreviewProps> = ({ featuredCourses }) => {
  const [api, setApi] = useState<any>(null);
  
  // Setup auto rotation for carousel
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [api]);
  
  return (
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
  );
};

export default HumanitiesPreview;
