import { Course, Discipline } from '@/lib/data/youtubeUniversity/types';

// Helper function to get YouTube video ID from URL
export const getYouTubeVideoId = (url: string): string | null => {
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
export const isYoutubeLink = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

// Determine if the course has an Apple Podcast link
export const hasApplePodcastLink = (course: Course): boolean => {
  return course.alternateLinks?.some(link => 
    link.platform.toLowerCase().includes('apple') && 
    link.url.includes('podcasts.apple.com')
  );
};

// Get Apple Podcast link if available
export const getApplePodcastLink = (course: Course): string | null => {
  if (!course.alternateLinks) return null;
  
  const podcastLink = course.alternateLinks.find(link => 
    link.platform.toLowerCase().includes('apple') && 
    link.url.includes('podcasts.apple.com')
  );
  
  return podcastLink ? podcastLink.url : null;
};

// Function to get the appropriate thumbnail URL based on course type
export const getThumbnailUrl = (course: Course): string => {
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
export const getResourceIcon = (course: Course): React.ReactNode => {
  if (isYoutubeLink(course.link)) {
    return <Play className="h-12 w-12 text-white" />;
  }
  
  if (hasApplePodcastLink(course)) {
    return <Headphones className="h-12 w-12 text-white" />;
  }
  
  return <ExternalLink className="h-12 w-12 text-white" />;
};

// Function to get the appropriate thumbnail link
export const getThumbnailLink = (course: Course): string => {
  // If there's a specific thumbnail video URL, use that for the thumbnail link
  if (course.thumbnailVideoUrl) {
    return course.thumbnailVideoUrl;
  }
  
  // Otherwise, use the main course link
  return course.link;
};

// Function to find a specific course by title and discipline
export const findCourse = (title: string): (Course & { disciplineName: string }) | null => {
  for (const discipline of disciplines) {
    const course = discipline.courses.find(c => c.title === title);
    if (course) {
      return { ...course, disciplineName: discipline.name };
    }
  }
  return null;
};

import { Play, Headphones, ExternalLink } from 'lucide-react';
import { disciplines } from '@/lib/data/youtubeUniversity';
