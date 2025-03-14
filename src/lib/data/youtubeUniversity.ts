
// YouTubeUniversity Data Structure

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

// This is where you'll add all your categorized courses
// You can easily edit this file to update the resources
export const disciplines: Discipline[] = [
  {
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
  },
  {
    id: 'history',
    name: 'History',
    courses: [
      {
        id: 'hist101',
        title: 'World History Survey',
        instructor: 'Prof. Robert Johnson',
        link: 'https://www.youtube.com/watch?v=example3',
        platform: 'youtube'
      }
    ]
  },
  {
    id: 'literature',
    name: 'Literature',
    courses: [
      {
        id: 'lit101',
        title: 'Old English and Beowolf',
        instructor: 'Arthur Bahr',
        link: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP61XcBw73jdcpNO-pju-mFtw',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'MIT',
            url: 'https://ocw.mit.edu/courses/21l-601j-old-english-and-beowulf-spring-2023/'
          }
        ]
      },
      {
        id: 'lit102',
        title: 'Dante in Translation',
        instructor: 'Giuseppe Mazzotta',
        link: 'https://www.youtube.com/playlist?list=PLD1450DFDA859F694',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/italian-language-and-literature/ital-310'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/dante-in-translation-audio/id341650796'
          }
        ]
      },
      {
        id: 'lit103',
        title: 'Cervantes\' Don Quixote',
        instructor: 'Roberto Gonzáles Echevarría',
        link: 'https://www.youtube.com/playlist?list=PL4A35EEAEE3880943',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/spanish-and-portuguese/span-300'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/cervantes-don-quixote-audio/id430668512'
          }
        ]
      },
      {
        id: 'lit104',
        title: 'Shakespeare and Politics',
        instructor: 'Paul Cantor',
        link: 'https://www.youtube.com/playlist?list=PLKjJE86mQRtsUKNTj5AmsBqoHkwuJP2kr',
        platform: 'youtube'
      },
      {
        id: 'lit105',
        title: 'Shakespeare After All: The Later Plays',
        instructor: 'Marjorie Garber',
        link: 'https://www.youtube.com/playlist?list=PLLBTlqKLPFAOwyw6tyJdshu-aHOyHA4TN',
        platform: 'youtube'
      },
      {
        id: 'lit106',
        title: 'Milton',
        instructor: 'John Rogers',
        link: 'https://www.youtube.com/playlist?list=PL2103FD9F9D0615B7',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/english/engl-220'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/milton-audio/id341652716'
          }
        ]
      },
      {
        id: 'lit107',
        title: 'Modern Poetry',
        instructor: 'Langdon Hammer',
        link: 'https://www.youtube.com/playlist?list=PLh9mgdi4rNewA25FVJ-lawQ-yr-alF58z',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/english/engl-310'
          }
        ]
      },
      {
        id: 'lit108',
        title: 'Hemingway, Fitzgerald, Faulkner',
        instructor: 'Wai Chee Dimock',
        link: 'https://www.youtube.com/playlist?list=PL84C3A4DD9C263D79',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/american-studies/amst-246'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/hemingway-fitzgerald-and-faulkner/id515956450'
          }
        ]
      },
      {
        id: 'lit109',
        title: 'The American Novel Since 1945',
        instructor: 'Amy Hungerford',
        link: 'https://www.youtube.com/playlist?list=PLE33BCD966FF96F23',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/english/engl-291'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/the-american-novel-since-1945-audio/id341650250'
          }
        ]
      },
      {
        id: 'lit110',
        title: 'Introduction to Theory of Literature',
        instructor: 'Paul Fry',
        link: 'https://www.youtube.com/playlist?list=PLD00D35CBC75941BD',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/english/engl-300'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/literary-theory-audio/id341652579'
          }
        ]
      }
    ]
  }
];
