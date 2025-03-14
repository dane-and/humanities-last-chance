
import { Discipline } from './types';

export const politicalScience: Discipline = {
  id: 'politicalScience',
  name: 'Political Science',
  courses: [
    {
      id: 'poli101',
      title: 'Introduction to Political Philosophy',
      instructor: 'Stephen Smith',
      link: 'https://www.youtube.com/playlist?list=PL8D95DEA9B7DFE825',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=xhm55mIdSuk&list=PL8D95DEA9B7DFE825',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/political-science/plsc-114'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/political-philosophy-audio/id341652030'
        }
      ]
    },
    {
      id: 'poli102',
      title: 'The Moral Foundations of Politics',
      instructor: 'Ian Shapiro',
      link: 'https://www.youtube.com/playlist?list=PL2FD48CE33DFBEA7E',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=s6MOA_Y3MKE&list=PL2FD48CE33DFBEA7E',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/political-science/plsc-118/lecture-1'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/the-moral-foundations-of-politics-audio/id429897773'
        }
      ]
    },
    {
      id: 'poli103',
      title: 'Power and Politics in Today\'s World',
      instructor: 'Ian Shapiro',
      link: 'https://www.youtube.com/playlist?list=PLh9mgdi4rNeyViG2ar68jkgEi4y6doNZy',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=BDqvzFY72mg&list=PLh9mgdi4rNeyViG2ar68jkgEi4y6doNZy',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://online.yale.edu/courses/power-and-politics-todays-world'
        }
      ]
    },
    {
      id: 'poli104',
      title: 'Capitalism: Success, Crisis and Reform',
      instructor: 'Douglas Rae',
      link: 'https://www.youtube.com/playlist?list=PL2497FD1251EED4DD',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=M3aw2ih626s&list=PL2497FD1251EED4DD',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/political-science/plsc-270'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/capitalism-success-crisis-and-reform-audio/id430597880'
        }
      ]
    }
  ]
};
