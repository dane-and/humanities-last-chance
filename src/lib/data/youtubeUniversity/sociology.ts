
import { Discipline } from './types';

export const sociology: Discipline = {
  id: 'sociology',
  name: 'Law and Sociology',
  courses: [
    {
      id: 'soc101',
      title: 'Foundations of Modern Social Theory',
      instructor: 'Iván Szelényi',
      link: 'https://www.youtube.com/playlist?list=PLDF7B08FF8564D1FE',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=hd33BahdAjs&list=PLDF7B08FF8564D1FE',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/sociology/socy-151'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/foundations-of-modern-social-theory-audio/id430657557'
        }
      ]
    },
    {
      id: 'soc102',
      title: 'Capital Punishment: Race, Poverty, and Disadvantage',
      instructor: 'Stephen Bright',
      link: 'https://www.youtube.com/playlist?list=PLh9mgdi4rNez7ZuPRY3KNJ2ef16qebyZe',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=sL7s0TPy-UQ&list=PLh9mgdi4rNez7ZuPRY3KNJ2ef16qebyZe',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://campuspress.yale.edu/capitalpunishment/'
        }
      ]
    },
    {
      id: 'soc103',
      title: 'Environmental Politics and Law',
      instructor: 'John Wargo',
      link: 'https://www.youtube.com/watch?v=3DyRdQ_Nih0&list=PL84DCD72C5B5DC403',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=3DyRdQ_Nih0&list=PL84DCD72C5B5DC403',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/environmental-studies/evst-255'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/environmental-politics-and-law-audio/id429210179'
        }
      ]
    }
  ]
};
