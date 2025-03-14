
// YouTubeUniversity Common Types

export interface Course {
  id: string;
  title: string;
  instructor: string;
  link: string;
  platform: 'youtube' | 'other';
  description?: string;
  alternateLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface Discipline {
  id: string;
  name: string;
  courses: Course[];
}
