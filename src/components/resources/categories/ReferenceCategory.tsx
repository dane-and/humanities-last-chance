
import React from 'react';
import { Book, Globe } from 'lucide-react';
import { ResourceCategory } from '../types';

export const referenceCategory: ResourceCategory = {
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
};
