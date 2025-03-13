
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  lastUpdated: string;
  isSystem?: boolean;
}

export const defaultPages: Page[] = [
  {
    id: '1',
    title: 'About',
    slug: 'about',
    content: '<h2>About Humanities Last Chance</h2><p>Humanities Last Chance is dedicated to promoting and preserving humanities scholarship in a digital age.</p><p>Our mission is to bridge the gap between academic research and public understanding, making humanities knowledge accessible to all.</p>',
    lastUpdated: 'January 1, 2023',
    isSystem: true
  },
  {
    id: '2',
    title: 'Contact',
    slug: 'contact',
    content: '<h2>Contact Us</h2><p>We welcome your feedback, questions, and suggestions.</p><p>You can reach us at <a href="mailto:info@humanitieslast.com">info@humanitieslast.com</a>.</p>',
    lastUpdated: 'January 1, 2023',
    isSystem: true
  },
  {
    id: '3',
    title: 'Resources',
    slug: 'resources',
    content: '<h2>Humanities Resources</h2><p>Here are some valuable resources for humanities scholars and enthusiasts:</p><ul><li><a href="https://www.humanities.org" target="_blank">National Foundation for the Humanities</a> - Supporting research, education, and public programs in the humanities.</li><li><a href="https://www.jstor.org" target="_blank">JSTOR</a> - Digital library of academic journals, books, and primary sources.</li></ul>',
    lastUpdated: 'January 1, 2023',
    isSystem: true
  }
];

export const getPagesFromStorage = (): Page[] => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedPages = localStorage.getItem('admin-pages');
      return savedPages ? JSON.parse(savedPages) : defaultPages;
    }
    return defaultPages;
  } catch (e) {
    console.error('Error reading pages from localStorage:', e);
    return defaultPages;
  }
};

export const savePagesToStorage = (pages: Page[]): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('admin-pages', JSON.stringify(pages));
    }
  } catch (e) {
    console.error('Error saving pages to localStorage:', e);
  }
};
