
import { Discipline } from './types';

export const blackStudies: Discipline = {
  id: 'blackStudies',
  name: 'Black Studies',
  courses: [
    {
      id: 'black101',
      title: 'African American History: From Emancipation to the Present Day',
      instructor: 'Jonathan Holloway',
      link: 'https://www.youtube.com/playlist?list=PLh9mgdi4rNeyqnC6Gj5VCZERhhy9CC1S6',
      platform: 'youtube',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/african-american-studies/afam-162'
        }
      ]
    },
    {
      id: 'black102',
      title: 'Black Matters: Introduction to Black Studies',
      instructor: 'Michel DeGraff and Noam Chomsky',
      link: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP62ihmDWYj4LMPMdHBHiPa_7',
      platform: 'youtube',
      alternateLinks: [
        {
          platform: 'MIT',
          url: 'https://ocw.mit.edu/courses/24-912-black-matters-introduction-to-black-studies-spring-2017/'
        }
      ]
    }
  ]
};
