
import { Discipline } from './types';

export const linguistics: Discipline = {
  id: 'linguistics',
  name: 'Linguistics',
  courses: [
    {
      id: 'ling101',
      title: 'Introduction to Linguistics',
      instructor: 'Norvin Richards',
      link: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63BZGNOqrF2qf_yxOjuG35j',
      platform: 'youtube',
      alternateLinks: [
        {
          platform: 'MIT',
          url: 'https://ocw.mit.edu/courses/24-900-introduction-to-linguistics-spring-2022/'
        }
      ]
    }
  ]
};
