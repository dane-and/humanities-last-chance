import React, { useState, useEffect, useCallback } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ExternalLink, Play, Headphones } from 'lucide-react';
import { disciplines } from '@/lib/data/youtubeUniversity';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Helper function to get YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // Handle playlist URLs
  if (url.includes('youtube.com/playlist')) {
    const playlistIdMatch = url.match(/list=([^&]+)/);
    return playlistIdMatch ? playlistIdMatch[1] : null;
  }
  
  // Handle regular video URLs
  const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return videoIdMatch ? videoIdMatch[1] : null;
};

// Determine if the course has a YouTube link
const isYoutubeLink = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

// Determine if the course has an Apple Podcast link
const hasApplePodcastLink = (course): boolean => {
  return course.alternateLinks?.some(link => 
    link.platform.toLowerCase().includes('apple') && 
    link.url.includes('podcasts.apple.com')
  );
};

// Get Apple Podcast link if available
const getApplePodcastLink = (course): string | null => {
  if (!course.alternateLinks) return null;
  
  const podcastLink = course.alternateLinks.find(link => 
    link.platform.toLowerCase().includes('apple') && 
    link.url.includes('podcasts.apple.com')
  );
  
  return podcastLink ? podcastLink.url : null;
};

// Function to get the appropriate thumbnail URL based on course type
const getThumbnailUrl = (course): string => {
  // If course has a specific thumbnail video URL, use that
  if (course.thumbnailVideoUrl && isYoutubeLink(course.thumbnailVideoUrl)) {
    const videoId = getYouTubeVideoId(course.thumbnailVideoUrl);
    if (videoId) {
      return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    }
  }
  
  // Otherwise, use the original logic
  if (isYoutubeLink(course.link)) {
    const videoId = getYouTubeVideoId(course.link);
    const isPlaylist = course.link.includes('playlist');
    
    if (videoId) {
      if (isPlaylist) {
        // For Yale courses
        if (course.alternateLinks?.some(link => link.platform === 'Yale')) {
          return '/lovable-uploads/f590c355-5b49-4f27-8bef-541f52d68c3b.png'; // Yale image
        }
        // For MIT courses
        else if (course.alternateLinks?.some(link => link.platform === 'MIT')) {
          return '/lovable-uploads/e658c919-e309-420a-aba2-1cd4af9fd449.png'; // MIT image
        }
        // Default playlist image
        return 'https://i.ytimg.com/vi/default/hqdefault.jpg';
      }
      // Regular YouTube video thumbnail
      return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    }
  }
  
  // Check for Apple Podcast link
  if (hasApplePodcastLink(course)) {
    return '/lovable-uploads/71dce2e5-1d5f-4477-89d1-7e18ea84e7f2.png'; // Apple Podcast image
  }
  
  // Default image if no other condition is met
  return '/placeholder.svg';
};

// Function to get the appropriate icon based on course type
const getResourceIcon = (course): React.ReactNode => {
  if (isYoutubeLink(course.link)) {
    return <Play className="h-12 w-12 text-white" />;
  }
  
  if (hasApplePodcastLink(course)) {
    return <Headphones className="h-12 w-12 text-white" />;
  }
  
  return <ExternalLink className="h-12 w-12 text-white" />;
};

// Function to get the appropriate thumbnail link
const getThumbnailLink = (course): string => {
  // If there's a specific thumbnail video URL, use that for the thumbnail link
  if (course.thumbnailVideoUrl) {
    return course.thumbnailVideoUrl;
  }
  
  // Otherwise, use the main course link
  return course.link;
};

// Function to find a specific course by title and discipline
const findCourse = (title: string) => {
  for (const discipline of disciplines) {
    const course = discipline.courses.find(c => c.title === title);
    if (course) {
      return { ...course, disciplineName: discipline.name };
    }
  }
  return null;
};

// Featured courses
const featuredCourseTitles = [
  "Shakespeare After All: The Later Plays",
  "The Hebrew Bible",
  "The Human Brain",
  "Introduction to Theory of Literature",
  "World Economic History Before the Industrial Revolution"
];

const HumanitiesLastChanceU: React.FC = () => {
  const [activeDiscipline, setActiveDiscipline] = useState<string | null>(null);
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
  
  // Filter the disciplines based on the active selection
  const disciplinesToDisplay = activeDiscipline 
    ? disciplines.filter(d => d.id === activeDiscipline) 
    : disciplines;

  return (
    <div>
      <div className="prose max-w-none mb-8">
        <h2 className="text-2xl font-serif">
          Humanities Last Chance U
        </h2>
        <p>
          Our curated collection of high-quality courses available for free on YouTube, organized by academic discipline. Most entries include links to course sites where you can find reading lists and other supplemental material relevant to the courses.
        </p>
      </div>

      {/* Featured Lectures Carousel */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Featured Lectures</h3>
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
              
              const thumbnailUrl = getThumbnailUrl(course);
              const thumbnailLink = getThumbnailLink(course);
              const resourceIcon = getResourceIcon(course);
              
              return (
                <CarouselItem key={course.id} className="basis-full">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                        <h4 className="text-white font-medium text-lg mb-1 line-clamp-2">{course.title}</h4>
                        <p className="text-white/90 text-sm mb-2">
                          {course.instructor} • <span className="text-xs">{course.disciplineName}</span>
                        </p>
                        <div className="inline-flex items-center text-sm font-medium text-white/90 hover:text-white">
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

      {/* Disciplines Section */}
      <div className="mb-4">
        <select 
          className="w-full md:w-auto p-2 border border-border rounded-md bg-background"
          value={activeDiscipline || ""}
          onChange={(e) => setActiveDiscipline(e.target.value || null)}
        >
          <option value="">All Disciplines</option>
          {disciplines.map((discipline) => (
            <option key={discipline.id} value={discipline.id}>
              {discipline.name} ({discipline.courses.length})
            </option>
          ))}
        </select>
      </div>

      <Accordion type="multiple" className="w-full">
        {disciplinesToDisplay.map((discipline) => (
          <AccordionItem key={discipline.id} value={discipline.id} className="mb-4">
            <AccordionTrigger className="text-lg font-medium">
              {discipline.name} ({discipline.courses.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 pt-2">
                {discipline.courses.map((course) => {
                  const thumbnailUrl = getThumbnailUrl(course);
                  const primaryLink = course.link;
                  const thumbnailLink = getThumbnailLink(course);
                  const applePodcastLink = getApplePodcastLink(course);
                  const resourceIcon = getResourceIcon(course);
                  
                  return (
                    <div key={course.id} className="group relative bg-card rounded-lg p-4 border transition-colors hover:bg-muted/50">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-shrink-0 w-full md:w-48 h-32 overflow-hidden rounded-md bg-muted">
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
                              href={primaryLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                            >
                              {isYoutubeLink(primaryLink) ? 'Watch on YouTube' : 'View Resource'}
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
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Show a reset button when a discipline is selected */}
      {activeDiscipline && (
        <div className="mt-4">
          <button
            onClick={() => setActiveDiscipline(null)}
            className="text-sm text-primary hover:underline"
          >
            Show all disciplines
          </button>
        </div>
      )}
    </div>
  );
};

export default HumanitiesLastChanceU;
