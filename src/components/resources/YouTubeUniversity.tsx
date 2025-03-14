
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ExternalLink, Youtube } from 'lucide-react';
import { disciplines } from '@/lib/data/youtubeUniversity';

const YouTubeUniversity: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="prose max-w-none mb-8">
        <h2 className="flex items-center gap-2 text-2xl font-serif">
          <Youtube className="h-6 w-6 text-red-600" />
          YouTube University
        </h2>
        <p>
          A curated collection of high-quality educational lectures and courses available on YouTube,
          organized by academic discipline. Each entry includes the course title and instructor name
          to help you find the content that interests you.
        </p>
      </div>

      <Accordion type="multiple" className="w-full">
        {disciplines.map((discipline) => (
          <AccordionItem key={discipline.id} value={discipline.id}>
            <AccordionTrigger className="text-lg font-medium">
              {discipline.name} ({discipline.courses.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {discipline.courses.map((course) => (
                  <div key={course.id} className="group relative bg-card rounded-lg p-4 border transition-colors hover:bg-muted/50">
                    <h3 className="text-lg font-medium mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                    {course.description && (
                      <p className="text-sm mt-2">{course.description}</p>
                    )}
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Watch on {course.platform === 'youtube' ? 'YouTube' : 'External Platform'}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default YouTubeUniversity;
