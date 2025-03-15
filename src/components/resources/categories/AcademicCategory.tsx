
import React from 'react';
import { Database, BookOpen, Library, Monitor } from 'lucide-react';
import { ResourceCategory } from '../types';

export const academicCategory: ResourceCategory = {
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
};
