
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Course } from '@/lib/data/youtubeUniversity/types';
import { getThumbnailUrl, getThumbnailLink, getResourceIcon } from './utils';

interface CourseItemProps {
  course: Course & { disciplineName?: string };
  featured?: boolean;
}

const CourseItem: React.FC<CourseItemProps> = ({ course, featured = false }) => {
  const thumbnailUrl = getThumbnailUrl(course);
  const thumbnailLink = getThumbnailLink(course);
  const resourceIcon = getResourceIcon(course);
  
  if (featured) {
    return (
      <a 
        href={thumbnailLink}
        target="_blank"
        rel="noopener noreferrer" 
        className="block"
      >
        <div className="relative rounded-lg overflow-hidden">
          <AspectRatio ratio={16/9}>
            <img 
              src={thumbnailUrl} 
              alt={`Thumbnail for ${course.title}`}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </AspectRatio>
          
          {/* Overlay with gradient and text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-3">
            <h4 className="text-white font-medium text-sm mb-1 line-clamp-2">{course.title}</h4>
            <p className="text-white/90 text-xs mb-1">
              {course.instructor} {course.disciplineName && `• ${course.disciplineName}`}
            </p>
            <div className="inline-flex items-center text-xs font-medium text-white/90 hover:text-white">
              Watch Lecture
              <ExternalLink className="ml-1 h-3 w-3" />
            </div>
          </div>
          
          {/* Play icon overlay */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/30 flex items-center justify-center transition-opacity">
            {resourceIcon}
          </div>
        </div>
      </a>
    );
  }
  
  return (
    <div className="group relative bg-card rounded-lg p-4 border transition-colors hover:bg-muted/50">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-shrink-0 w-full md:w-36 h-24 overflow-hidden rounded-md bg-muted">
          <a 
            href={thumbnailLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block relative w-full h-full group"
          >
            <img 
              src={thumbnailUrl} 
              alt={`Thumbnail for ${course.title}`} 
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {resourceIcon}
            </div>
          </a>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-1">{course.title}</h3>
          <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
          {course.description && (
            <p className="text-sm mt-2">{course.description}</p>
          )}
          <div className="mt-3 space-y-1">
            <a
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              {course.link.includes('youtube.com') || course.link.includes('youtu.be') 
                ? 'Watch on YouTube' 
                : 'View Resource'}
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
            
            {course.alternateLinks && course.alternateLinks.length > 0 && (
              <div className="text-sm mt-1">
                <p className="text-xs text-muted-foreground mt-2 mb-1">Alternative platforms:</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {course.alternateLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:underline"
                    >
                      {link.platform}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
