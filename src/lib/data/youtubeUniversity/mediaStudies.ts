
import { Discipline } from './types';

export const mediaStudies: Discipline = {
  id: 'mediaStudies',
  name: 'Media Studies',
  courses: [
    {
      id: 'media101',
      title: 'The Film Experience',
      instructor: 'David Thorburn',
      link: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63wurgwdJKo6UEYBWDLnmCj',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=LFOsw1Vccac&list=PLUl4u3cNGP63wurgwdJKo6UEYBWDLnmCj',
      alternateLinks: [
        {
          platform: 'MIT',
          url: 'https://ocw.mit.edu/courses/21l-011-the-film-experience-fall-2013/'
        }
      ]
    }
  ]
};
