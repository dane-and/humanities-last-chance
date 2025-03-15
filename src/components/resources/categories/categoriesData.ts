
import React from 'react';
import { 
  Book, BookOpen, Globe, Database, Library, Monitor, 
  BookAudio, Headphones, Radio, History, Mic 
} from 'lucide-react';
import { ResourceCategory } from '../types';

export const categoriesData: ResourceCategory[] = [
  {
    id: 'audiobooks',
    name: 'Audiobooks & Podcasts',
    resources: [
      {
        name: 'Librivox',
        url: 'https://librivox.org/',
        description: 'Free public domain audiobooks.',
        icon: <BookAudio className="h-5 w-5 text-primary" />
      },
      {
        name: 'Natural Reader',
        url: 'https://www.naturalreaders.com/',
        description: 'Text-to-speech tool.',
        icon: <Headphones className="h-5 w-5 text-primary" />
      },
      {
        name: 'Speech Central',
        url: 'https://speechcentral.net/',
        description: 'Listen to written content.',
        icon: <Radio className="h-5 w-5 text-primary" />
      },
      {
        name: 'C-SPAN Book TV Video Archive',
        url: 'https://www.c-span.org/bookTv/',
        description: 'Author talks and historical discussions.',
        icon: <BookOpen className="h-5 w-5 text-primary" />
      },
      {
        name: 'In Our Time (BBC)',
        url: 'https://podcasts.apple.com/us/podcast/in-our-time/id73330895',
        description: 'Scholarly discussions on history and philosophy.',
        icon: <Mic className="h-5 w-5 text-primary" />
      },
      {
        name: 'The Rest is History',
        url: 'https://podcasts.apple.com/us/podcast/the-rest-is-history/id1537788786',
        description: 'Engaging historical storytelling.',
        icon: <History className="h-5 w-5 text-primary" />
      },
      {
        name: 'Conversations with Tyler',
        url: 'https://podcasts.apple.com/us/podcast/conversations-with-tyler/id983795625',
        description: 'Brilliant interviews, occasionally but not always with humanities scholars.',
        icon: <Mic className="h-5 w-5 text-primary" />
      },
      {
        name: 'Open Culture Free Audiobooks',
        url: 'https://www.openculture.com/freeaudiobooks',
        description: 'A curated selection of public-domain audiobooks.',
        icon: <Library className="h-5 w-5 text-primary" />
      }
    ]
  },
  {
    id: 'ebooks',
    name: 'Ebooks & Digital Libraries',
    resources: [
      {
        name: 'Google Books',
        url: 'https://books.google.com/',
        description: 'Search and preview millions of books.',
        icon: <Book className="h-5 w-5 text-primary" />
      },
      {
        name: 'Project Gutenberg',
        url: 'https://www.gutenberg.org/',
        description: 'Free public domain ebooks.',
        icon: <BookOpen className="h-5 w-5 text-primary" />
      },
      {
        name: 'Internet Archive',
        url: 'https://archive.org/',
        description: 'A vast collection of books, documents, and historical texts.',
        icon: <Database className="h-5 w-5 text-primary" />
      },
      {
        name: 'HathiTrust Digital Library',
        url: 'https://www.hathitrust.org/',
        description: 'Scholarly digital library of public domain works.',
        icon: <Library className="h-5 w-5 text-primary" />
      },
      {
        name: 'Perseus Digital Library',
        url: 'http://www.perseus.tufts.edu/hopper/',
        description: 'Classical texts and translations.',
        icon: <BookOpen className="h-5 w-5 text-primary" />
      },
      {
        name: 'Marxists Internet Archive',
        url: 'https://www.marxists.org/',
        description: 'Political and social theory texts.',
        icon: <BookOpen className="h-5 w-5 text-primary" />
      }
    ]
  },
  {
    id: 'reference',
    name: 'Reference Works & Encyclopedias',
    resources: [
      {
        name: 'Stanford Encyclopedia of Philosophy',
        url: 'https://plato.stanford.edu/',
        description: 'Scholarly philosophy reference.',
        icon: <Book className="h-5 w-5 text-primary" />
      },
      {
        name: 'Oxford English Dictionary',
        url: 'https://www.oed.com/',
        description: 'The definitive English dictionary (subscription-based).',
        icon: <Book className="h-5 w-5 text-primary" />
      },
      {
        name: 'Encyclopedia Britannica',
        url: 'https://www.britannica.com/',
        description: 'General knowledge reference.',
        icon: <Globe className="h-5 w-5 text-primary" />
      }
    ]
  },
  {
    id: 'academic',
    name: 'Academic Search & Open-Access Journals',
    resources: [
      {
        name: 'Google Scholar',
        url: 'https://scholar.google.com/',
        description: 'Search academic papers and citations.',
        icon: <Database className="h-5 w-5 text-primary" />
      },
      {
        name: 'DOAJ (Directory of Open Access Journals)',
        url: 'https://doaj.org/',
        description: 'Freely accessible scholarly articles.',
        icon: <BookOpen className="h-5 w-5 text-primary" />
      },
      {
        name: 'JSTOR Open Content',
        url: 'https://www.jstor.org/open/',
        description: 'Free academic journal articles.',
        icon: <Library className="h-5 w-5 text-primary" />
      },
      {
        name: 'CORE',
        url: 'https://core.ac.uk/',
        description: 'Repository of open-access research papers.',
        icon: <Monitor className="h-5 w-5 text-primary" />
      }
    ]
  }
];
