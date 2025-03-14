
import { Discipline } from './types';

export const architecture: Discipline = {
  id: 'architecture',
  name: 'Architecture',
  courses: [
    {
      id: 'arch101',
      title: 'Roman Architecture',
      instructor: 'Diana Kleiner',
      link: 'https://www.youtube.com/playlist?list=PLBCB3059E45654BCE',
      platform: 'youtube',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/history-of-art/hsar-252'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/roman-architecture-audio/id341652873'
        }
      ]
    },
    {
      id: 'arch102',
      title: 'Theory of City Form',
      instructor: 'Julian Beinart',
      link: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63hVXZEMszpS_CWvUFsURr6',
      platform: 'youtube',
      alternateLinks: [
        {
          platform: 'MIT',
          url: 'https://ocw.mit.edu/courses/4-241j-theory-of-city-form-spring-2013/'
        }
      ]
    }
  ]
};
