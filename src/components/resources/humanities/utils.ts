import { Course, Discipline } from '@/lib/data/youtubeUniversity/types';
import { Play, Headphones, ExternalLink } from 'lucide-react';
import React from 'react';

// Helper function to get YouTube video ID from URL
export const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // Handle playlist URLs
  if (url.includes('youtube.com/playlist')) {
    const playlistIdMatch = url.match(/list=([^&]+)/);
    return playlistIdMatch ? playlistIdMatch[1] : null;
  }
  
  // Regular video URLs
  const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return videoIdMatch ? videoIdMatch[1] : null;
};

// Safely check if a URL is from YouTube
export const isYoutubeLink = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    // Check for official YouTube domains
    return parsedUrl.hostname === 'youtube.com' || 
           parsedUrl.hostname === 'www.youtube.com' || 
           parsedUrl.hostname === 'youtu.be' ||
           parsedUrl.hostname === 'm.youtube.com' ||
           parsedUrl.hostname.endsWith('.youtube.com');
  } catch {
    // If URL parsing fails, it's not a valid URL
    return false;
  }
};

// Safely check if a URL is from Apple Podcasts
export const isApplePodcastsUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    // Check for official Apple Podcasts domains
    return parsedUrl.hostname === 'podcasts.apple.com' || 
           parsedUrl.hostname.endsWith('.podcasts.apple.com');
  } catch {
    // If URL parsing fails, it's not a valid URL
    return false;
  }
};

// Determine if the course has an Apple Podcast link
export const hasApplePodcastLink = (course: Course): boolean => {
  return course.alternateLinks?.some(link => 
    link.platform.toLowerCase().includes('apple') && 
    isApplePodcastsUrl(link.url)
  );
};

// Get Apple Podcast link if available
export const getApplePodcastLink = (course: Course): string | null => {
  if (!course.alternateLinks) return null;
  
  const podcastLink = course.alternateLinks.find(link => 
    link.platform.toLowerCase().includes('apple') && 
    isApplePodcastsUrl(link.url)
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
export const getResourceIcon = (course: Course): JSX.Element => {
  if (isYoutubeLink(course.link)) {
    return React.createElement(Play, { className: "h-12 w-12 text-white" });
  }
  
  if (hasApplePodcastLink(course)) {
    return React.createElement(Headphones, { className: "h-12 w-12 text-white" });
  }
  
  return React.createElement(ExternalLink, { className: "h-12 w-12 text-white" });
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

import { disciplines } from '@/lib/data/youtubeUniversity';
