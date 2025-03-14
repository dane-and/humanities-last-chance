
import { Discipline } from './types';

export const philosophy: Discipline = {
  id: 'philosophy',
  name: 'Philosophy',
  courses: [
    {
      id: 'phil101',
      title: 'Philosophy and the Science of Human Nature',
      instructor: 'Tamar Gendler',
      link: 'https://www.youtube.com/playlist?list=PL3F6BC200B2930084',
      platform: 'youtube',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/philosophy/phil-181'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/philosophy-and-science-of-human-nature/id514400730'
        }
      ]
    },
    {
      id: 'phil102',
      title: 'Death',
      instructor: 'Shelly Kagan',
      link: 'https://www.youtube.com/playlist?list=PLEA18FAF1AD9047B0',
      platform: 'youtube',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/death/phil-176'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/death-audio/id341650967'
        }
      ]
    },
    {
      id: 'phil103',
      title: 'Justice',
      instructor: 'Michael Sandel',
      link: 'https://www.youtube.com/playlist?list=PL30C13C91CFFEFEA6',
      platform: 'youtube',
      alternateLinks: [
        {
          platform: 'Harvard',
          url: 'https://sandel.scholars.harvard.edu/justice'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/wisdom-audio/id1561619346?i=1000515835225'
        }
      ]
    },
    {
      id: 'phil104',
      title: 'Kant: Critique of Pure Reason',
      instructor: 'Robert Paul Wolff',
      link: 'https://www.youtube.com/playlist?list=PL-84EpGzfQMeg_WsYRpI5EEG0RCgpIvjV',
      platform: 'youtube'
    },
    {
      id: 'phil105',
      title: 'Marx',
      instructor: 'Robert Paul Wolff',
      link: 'https://www.youtube.com/playlist?list=PLCFOtOThmlATqqQzsdraIBj1tLO8L91rY',
      platform: 'youtube'
    }
  ]
};
