
import { Discipline } from './types';

export const economics: Discipline = {
  id: 'economics',
  name: 'Economics',
  courses: [
    {
      id: 'econ101',
      title: 'Principles of Microeconomics',
      instructor: 'Jonathan Gruber',
      link: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP62oJSoqb4Rf-vZMGUBe59G-',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=_OkTw766oCs&list=PLUl4u3cNGP62oJSoqb4Rf-vZMGUBe59G-',
      alternateLinks: [
        {
          platform: 'MIT',
          url: 'https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2018/'
        }
      ]
    },
    {
      id: 'econ102',
      title: 'Principles of Macroeconomics',
      instructor: 'Ricardo Caballero',
      link: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP62EXoZ4B3_Ob7lRRwpGQxkb',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=heBErnN3ZPk&list=PLUl4u3cNGP62EXoZ4B3_Ob7lRRwpGQxkb',
      alternateLinks: [
        {
          platform: 'MIT',
          url: 'https://ocw.mit.edu/courses/14-02-principles-of-macroeconomics-spring-2023/'
        }
      ]
    },
    {
      id: 'econ103',
      title: 'Psychology and Economics',
      instructor: 'Frank Schilbach',
      link: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63Z979ri_UXXk_1zrvrF77Q',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=j5XdY5wkVTA&list=PLUl4u3cNGP63Z979ri_UXXk_1zrvrF77Q',
      alternateLinks: [
        {
          platform: 'MIT',
          url: 'https://ocw.mit.edu/courses/14-13-psychology-and-economics-spring-2020/'
        }
      ]
    },
    {
      id: 'econ104',
      title: 'The Challenge of World Poverty',
      instructor: 'Esther Duflo and Abhijit Banerjee',
      link: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP620R91K4KP_fO4l3eeK5lDn',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=K2LvCx8H0OU&list=PLUl4u3cNGP620R91K4KP_fO4l3eeK5lDn',
      alternateLinks: [
        {
          platform: 'MIT',
          url: 'https://ocw.mit.edu/courses/14-73-the-challenge-of-world-poverty-spring-2011/'
        }
      ]
    },
    {
      id: 'econ105',
      title: 'World Economic History Before the Industrial Revolution',
      instructor: 'Greg Clark',
      link: 'https://www.youtube.com/playlist?list=PL_w_qWAQZtAYqD1KnrMdZ5vpxyNUlq_rr',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=6XmLBpfsovE&list=PL_w_qWAQZtAYqD1KnrMdZ5vpxyNUlq_rr'
    },
    {
      id: 'econ106',
      title: 'Financial Markets',
      instructor: 'Robert Schiller',
      link: 'https://www.youtube.com/playlist?list=PL8FB14A2200B87185',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=WQui_3Hpmmc&list=PL8FB14A2200B87185',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/economics/econ-252'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/financial-markets-2011/id515020829'
        }
      ]
    },
    {
      id: 'econ107',
      title: 'Game Theory',
      instructor: 'Ben Polak',
      link: 'https://www.youtube.com/playlist?list=PL6EF60E1027E1A10B',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=nM3rTU927io&list=PL6EF60E1027E1A10B',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/economics/econ-159'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/game-theory-audio/id341651861'
        }
      ]
    },
    {
      id: 'econ108',
      title: 'Financial Theory',
      instructor: 'John Geanakoplos',
      link: 'https://www.youtube.com/playlist?list=PLEDC55106E0BA18FC',
      platform: 'youtube',
      thumbnailVideoUrl: 'https://www.youtube.com/watch?v=vTs2IQ8OefQ&list=PLEDC55106E0BA18FC',
      alternateLinks: [
        {
          platform: 'Yale',
          url: 'https://oyc.yale.edu/economics/econ-251'
        },
        {
          platform: 'Apple Podcasts',
          url: 'https://podcasts.apple.com/us/podcast/financial-theory-audio/id428549105'
        }
      ]
    }
  ]
};
