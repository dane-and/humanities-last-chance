
import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import CourseItem from './CourseItem';
import { findCourse } from './utils';

// Featured courses list
const featuredCourseTitles = [
  "Shakespeare After All: The Later Plays",
  "The Hebrew Bible",
  "The Human Brain",
  "Introduction to Theory of Literature",
  "World Economic History Before the Industrial Revolution"
];

const FeaturedCourses: React.FC = () => {
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
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-4">Featured Courses</h3>
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
            
            return (
              <CarouselItem key={course.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <CourseItem course={course} featured={true} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="static mx-2 transform-none" />
          <CarouselNext className="static mx-2 transform-none" />
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturedCourses;
