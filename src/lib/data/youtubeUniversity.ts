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
        title: 'Introduction to Ancient Greek History',
        instructor: 'Donald Kagan',
        link: 'https://www.youtube.com/playlist?list=PL023BCE5134243987',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/classics/clcv-205'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/ancient-greek-history-audio/id341651987'
          }
        ]
      },
      {
        id: 'hist102',
        title: 'The Early Middle Ages, 284-1000',
        instructor: 'Paul Freedman',
        link: 'https://www.youtube.com/playlist?list=PL77A337915A76F660',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/history/hist-210'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/early-middle-ages/id515946405'
          }
        ]
      },
      {
        id: 'hist103',
        title: 'Early Modern England',
        instructor: 'Keith Wrightson',
        link: 'https://www.youtube.com/playlist?list=PL18B9F132DFD967A3',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/history/hist-251'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/early-modern-england-politics-religion-and-society/id429491092'
          }
        ]
      },
      {
        id: 'hist104',
        title: 'Epidemics in Western Society Since 1600',
        instructor: 'Frank Snowden',
        link: 'https://www.youtube.com/playlist?list=PL3AE7B3B6917DE8E6',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/history/hist-234'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/epidemics-in-western-society-since-1600-audio/id429468934'
          }
        ]
      },
      {
        id: 'hist105',
        title: 'European Civilization, 16480-1945',
        instructor: 'John Merriman',
        link: 'https://www.youtube.com/playlist?list=PL3A8E6CE294860A24',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/history/hist-202'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/european-civilization-1648-1945-audio/id341651047'
          }
        ]
      },
      {
        id: 'hist106',
        title: 'The American Revolution',
        instructor: 'Joanne Freeman',
        link: 'https://www.youtube.com/playlist?list=PLDA2BC5E785D495AB',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/history/hist-116'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/the-american-revolution-audio/id429260982'
          }
        ]
      },
      {
        id: 'hist107',
        title: 'The Civil War and Reconstruction',
        instructor: 'David Blight',
        link: 'https://www.youtube.com/playlist?list=PL5DD220D6A1282057',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/history/hist-119'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/the-civil-war-and-reconstruction-era-1845-1877-audio/id341650730'
          }
        ]
      },
      {
        id: 'hist108',
        title: 'France Since 1871',
        instructor: 'John Merriman',
        link: 'https://www.youtube.com/playlist?list=PLE653BF062C136B62',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://oyc.yale.edu/history/hist-276'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/france-since-1871-audio/id341651330'
          }
        ]
      },
      {
        id: 'hist109',
        title: 'The History of MIT',
        instructor: 'David Mindell and Merritt Roe Smith',
        link: 'https://www.youtube.com/playlist?list=PL7590BF3B139A354D',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'MIT',
            url: 'https://ocw.mit.edu/courses/sts-050-the-history-of-mit-spring-2011/'
          }
        ]
      },
      {
        id: 'hist110',
        title: 'The Making of Modern Ukraine',
        instructor: 'Timothy Snyder',
        link: 'https://www.youtube.com/playlist?list=PLh9mgdi4rNewfxO7LhBoz_1Mx1MaO6sw_',
        platform: 'youtube',
        alternateLinks: [
          {
            platform: 'Yale',
            url: 'https://online.yale.edu/courses/making-modern-ukraine'
          },
          {
            platform: 'Apple Podcasts',
            url: 'https://podcasts.apple.com/us/podcast/the-making-of-modern-ukraine/id1653131950'
          }
        ]
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
  },
  {
    id: 'religion',
    name: 'Religion',
    courses: [
      {
        id: 'rel101',
        title: 'The Hebrew Bible',
        instructor: 'Shaye Cohen',
        link: 'https://www.youtube.com/playlist?list=PLirQt4asn3oI_FRsu6xb_LoBhCTLvXhZq',
        platform: 'youtube'
      },
      {
        id: 'rel102',
        title: 'Introduction to the Old Testament',
        instructor: 'Christine Hayes',
        link: 'https://www.youtube.com/playlist?list=PLh9mgdi4rNeyuvTEbD-Ei0JdMUujXfyWi',
        platform: 'youtube',
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
        platform: 'youtube'
      }
    ]
  }
];
