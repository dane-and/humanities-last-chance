
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ExternalLink, Play } from 'lucide-react';
import { disciplines } from '@/lib/data/youtubeUniversity';
import DisciplinesSidebar from './DisciplinesSidebar';

// Helper function to get YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  // Handle playlist URLs
  if (url.includes('youtube.com/playlist')) {
    const playlistIdMatch = url.match(/list=([^&]+)/);
    return playlistIdMatch ? playlistIdMatch[1] : null;
  }
  
  // Handle regular video URLs
  const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return videoIdMatch ? videoIdMatch[1] : null;
};

// Function to generate YouTube thumbnail URL
const getYouTubeThumbnailUrl = (videoId: string | null, isPlaylist: boolean): string => {
  if (!videoId) return '';
  
  if (isPlaylist) {
    // Return a placeholder image for playlists
    return `https://i.ytimg.com/vi/default/hqdefault.jpg`;
  }
  
  // Return the high-quality thumbnail
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
};

const HumanitiesLastChanceU: React.FC = () => {
  const [activeDiscipline, setActiveDiscipline] = useState<string | null>(null);
  
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
          A curated collection of high-quality educational lectures and courses available on YouTube,
          organized by academic discipline. Each entry includes the course title and instructor name
          to help you find the content that interests you.
        </p>
      </div>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <DisciplinesSidebar 
          activeDiscipline={activeDiscipline} 
          onDisciplineChange={setActiveDiscipline} 
        />
        
        <div className="flex-1">
          <Accordion type="multiple" className="w-full">
            {disciplinesToDisplay.map((discipline) => (
              <AccordionItem key={discipline.id} value={discipline.id} className="mb-4">
                <AccordionTrigger className="text-lg font-medium">
                  {discipline.name} ({discipline.courses.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pt-2">
                    {discipline.courses.map((course) => {
                      const isYoutube = course.platform === 'youtube';
                      const isPlaylist = isYoutube && course.link.includes('playlist');
                      const videoId = isYoutube ? getYouTubeVideoId(course.link) : null;
                      const thumbnailUrl = isYoutube ? getYouTubeThumbnailUrl(videoId, isPlaylist) : '';
                      
                      return (
                        <div key={course.id} className="group relative bg-card rounded-lg p-4 border transition-colors hover:bg-muted/50">
                          <div className="flex flex-col md:flex-row gap-4">
                            {isYoutube && videoId && (
                              <div className="relative flex-shrink-0 w-full md:w-48 h-32 overflow-hidden rounded-md bg-muted">
                                <a 
                                  href={course.link} 
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
                                    <Play className="h-12 w-12 text-white" />
                                  </div>
                                </a>
                              </div>
                            )}
                            
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
                                  Watch on {course.platform === 'youtube' ? 'YouTube' : 'External Platform'}
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
      </div>
    </div>
  );
};

export default HumanitiesLastChanceU;
