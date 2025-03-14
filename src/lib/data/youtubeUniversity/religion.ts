
import { Discipline } from './types';

export const religion: Discipline = {
  id: 'religion',
  name: 'Religion',
  courses: [
    {
      id: 'rel101',
      title: 'The Hebrew Bible',
      instructor: 'Shaye Cohen',
      link: 'https://www.youtube.com/playlist?list=PLirQt4asn3oI_FRsu6xb_LoBhCTLvXhZq',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=Y-lw-_nf_NM&list=PLirQt4asn3oI_FRsu6xb_LoBhCTLvXhZq'
    },
    {
      id: 'rel102',
      title: 'Introduction to the Old Testament',
      instructor: 'Christine Hayes',
      link: 'https://www.youtube.com/playlist?list=PLh9mgdi4rNeyuvTEbD-Ei0JdMUujXfyWi',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=mo-YL-lv3RY&list=PLh9mgdi4rNeyuvTEbD-Ei0JdMUujXfyWi',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/religious-studies/rlst-145'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/wisdom-audio/id1561619346?i=1000516281133'
        }
      ]
    },
    {
      id: 'rel103',
      title: 'New Testament History and Literature',
      instructor: 'Dale Martin',
      link: 'https://www.youtube.com/playlist?list=PL279CFA55C51E75E0',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=dtQ2TS1CiDY&list=PL279CFA55C51E75E0',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/religious-studies/rlst-152'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/introduction-to-new-testament-history-and-literature/id341652017'
        }
      ]
    },
    {
      id: 'rel104',
      title: 'Hebrew Scriptures in Judaism and Christianity',
      instructor: 'Shaye Cohen',
      link: 'https://www.youtube.com/playlist?list=PLirQt4asn3oLOBsPIPkGIHa7hu_ailMsx',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=Y8bmP1nI0Jg&list=PLirQt4asn3oLOBsPIPkGIHa7hu_ailMsx'
    }
  ]
};
