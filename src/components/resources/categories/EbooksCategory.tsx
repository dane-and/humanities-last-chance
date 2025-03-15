
import React from 'react';
import { Book, BookOpen, Database, Library } from 'lucide-react';
import { ResourceCategory } from '../types';

export const ebooksCategory: ResourceCategory = {
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
};
