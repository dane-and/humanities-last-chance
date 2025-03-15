
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ExternalLink, Headphones, BookAudio, Radio, History, Mic, Library, BookOpen } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Resource {
  name: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
}

interface ResourceCategory {
  id: string;
  name: string;
  resources: Resource[];
}

const resourceCategories: ResourceCategory[] = [
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
        icon: <BookOpen className="h-5 w-5 text-primary" />
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
        icon: <Library className="h-5 w-5 text-primary" />
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
        icon: <BookOpen className="h-5 w-5 text-primary" />
      },
      {
        name: 'Oxford English Dictionary',
        url: 'https://www.oed.com/',
        description: 'The definitive English dictionary (subscription-based).',
        icon: <BookOpen className="h-5 w-5 text-primary" />
      },
      {
        name: 'Encyclopedia Britannica',
        url: 'https://www.britannica.com/',
        description: 'General knowledge reference.',
        icon: <BookOpen className="h-5 w-5 text-primary" />
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
        icon: <BookOpen className="h-5 w-5 text-primary" />
      },
      {
        name: 'DOAJ (Directory of Open Access Journals)',
        url: 'https://doaj.org/',
        description: 'Freely accessible scholarly articles.',
        icon: <Library className="h-5 w-5 text-primary" />
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
        icon: <Library className="h-5 w-5 text-primary" />
      }
    ]
  }
];

const OtherResources: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="prose max-w-none mb-8">
        <h2 className="text-2xl font-serif">Other Resources</h2>
        <p>
          A curated collection of online resources valuable for humanities scholars,
          researchers, and enthusiasts. These websites offer free and accessible content
          spanning various media formats and disciplines.
        </p>
      </div>
      
      <Accordion type="multiple" className="w-full">
        {resourceCategories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger className="text-lg font-medium">
              {category.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 pt-2">
                {category.resources.map((resource, index) => (
                  <div key={index} className="group bg-card rounded-lg p-4 border transition-colors hover:bg-muted/50">
                    <div className="flex items-start space-x-3">
                      {resource.icon}
                      <div className="flex-1 space-y-1">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-lg font-medium text-primary hover:underline"
                        >
                          {resource.name}
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                        {resource.description && (
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default OtherResources;
