
import React from 'react';
import { BookAudio, Headphones, Radio, History, Mic, Library, BookOpen } from 'lucide-react';
import { ResourceCategory } from '../types';

export const audiobooksCategory: ResourceCategory = {
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
};
