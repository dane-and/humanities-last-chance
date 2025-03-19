
export interface Comment {
  id: string;
  articleId: string;
  name: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
}

export interface ArticleAnalytics {
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  lastUpdated: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  author?: string;
  date: string;
  category: 'Blog' | 'Interview' | 'Review' | 'Resource';
  image: string; // We'll keep this as string but handle empty strings as "no image"
  imageCaption?: string;
  excerpt: string;
  content: string;
  featured?: boolean;
  tags?: string[];
  comments?: Comment[];
  isDraft?: boolean;
  scheduledDate?: string;
  analytics?: ArticleAnalytics;
  lastModified?: string;
  status?: 'published' | 'draft' | 'scheduled';
  mediaAttachments?: string[];
}

export const defaultArticles: Article[] = [
  {
    id: '1',
    title: 'Saturday Assorted Links',
    slug: 'saturday-assorted-links',
    date: 'March 15, 2025',
    category: 'Blog',
    image: '', // Empty string indicates no image
    excerpt: 'A collection of interesting articles and resources from around the web.',
    content: '<ol><li><a href="https://www.chronicle.com/article/students-are-missing-the-point-of-college" rel="noopener noreferrer" target="_blank">What\'s the point of college?</a> My experience with students jives with the argument here. (Beware paywall.)</li><li>Even people who didn\'t like the protests at Columbia shouldn\'t like <a href="https://www.wsj.com/us-news/law/deport-mahmoud-khalil-green-card-rights-23439203?mod=education_news_article_pos1" rel="noopener noreferrer" target="_blank">this</a>. To this non-lawyer, the legal grounds seem thin. I seem to recall a saying about two wrongs...?</li><li><a href="https://www.nytimes.com/2025/03/12/magazine/university-discrimination-ethics.html" rel="noopener noreferrer" target="_blank">The Ethicist</a> on telling your friend her fiction sucks. What he doesn\'t ask is, Why are you friends with such a bad writer?</li><li>Daniel Kahneman\'s<a href="https://www.wsj.com/arts-culture/books/daniel-kahneman-assisted-suicide-9fb16124?mod=arts-culture_lead_pos2" rel="noopener noreferrer" target="_blank"> assisted suicide</a> and the question of its rationality.</li><li><a href="https://www.chronicle.com/article/the-online-overhaul" rel="noopener noreferrer" target="_blank">Virtual classes aren\'t going anywhere</a>. Online lectures are fine and could be great. Ideally, though, they shouldn\'t get rid of classroom time but create time for more engaging, interactive, and seminar-style activities. (Beware paywall.)</li></ol><p><br></p>',
    featured: true,
    tags: ['education', 'philosophy', 'academia'],
    comments: [
      {
        id: 'comment1',
        articleId: '1',
        name: 'Jennifer Thomas',
        content: 'I strongly agree with your point about virtual classes. They should enhance, not replace, in-person learning experiences.',
        date: 'March 16, 2025 at 9:45 AM',
        likes: 5,
        dislikes: 0
      },
      {
        id: 'comment2',
        articleId: '1',
        name: 'Michael Rodriguez',
        content: 'The article about Columbia protests raises important questions about due process and proportional responses. Thanks for highlighting this.',
        date: 'March 16, 2025 at 11:30 AM',
        likes: 3,
        dislikes: 1
      }
    ],
    analytics: {
      views: 342,
      uniqueVisitors: 289,
      avgTimeOnPage: 3.5,
      lastUpdated: new Date().toISOString()
    }
  },
  {
    id: '2',
    title: 'The Future of Humanities Education',
    slug: 'future-humanities-education',
    author: 'Dr. Elizabeth Chen',
    date: 'March 13, 2025',
    category: 'Blog',
    image: '/lovable-uploads/f26a3192-be99-49a7-ba1e-de7b29518b47.png',
    imageCaption: 'Modern classroom with students engaged in discussion',
    excerpt: 'Exploring new pedagogical approaches to humanities education in the digital age.',
    content: '<p>The humanities face unprecedented challenges in the digital age. Declining enrollments, budget cuts, and questions about relevance have all contributed to what some call a "crisis" in humanities education. Yet there are promising developments on the horizon.</p><h2>Digital Humanities</h2><p>Digital humanities represent one of the most exciting frontiers. By combining traditional humanistic inquiry with computational methods, scholars are able to analyze texts, historical documents, and cultural artifacts at unprecedented scales.</p><h2>Interdisciplinary Approaches</h2><p>Breaking down disciplinary silos has become increasingly important. Programs that connect humanities with sciences, technology, and professional fields offer students broader perspectives and more diverse career paths.</p><p>What do you think about these developments? Are they enough to ensure the vitality of humanities education in the coming decades?</p>',
    featured: false,
    tags: ['education', 'digital humanities', 'pedagogy'],
    comments: []
  }
];

