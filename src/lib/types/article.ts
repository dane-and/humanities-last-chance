
export interface Comment {
  id: string;
  articleId: string;
  name: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
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
}

export const defaultArticles: Article[] = [
  {
    id: '1',
    title: 'Saturday Assorted Links',
    slug: 'saturday-assorted-links',
    date: 'March 15, 2025',
    category: 'Blog',
    image: '', // Empty string indicates no image
    excerpt: '', // Remove the default excerpt
    content: '<ol><li><a href="https://www.chronicle.com/article/students-are-missing-the-point-of-college" rel="noopener noreferrer" target="_blank">What\'s the point of college?</a> My experience with students jives with the argument here. (Beware paywall.)</li><li>Even people who didn\'t like the protests at Columbia shouldn\'t like <a href="https://www.wsj.com/us-news/law/deport-mahmoud-khalil-green-card-rights-23439203?mod=education_news_article_pos1" rel="noopener noreferrer" target="_blank">this</a>. To this non-lawyer, the legal grounds seem thin. I seem to recall a saying about two wrongs...?</li><li><a href="https://www.nytimes.com/2025/03/12/magazine/university-discrimination-ethics.html" rel="noopener noreferrer" target="_blank">The Ethicist</a> on telling your friend her fiction sucks. What he doesn\'t ask is, Why are you friends with such a bad writer?</li><li>Daniel Kahneman\'s<a href="https://www.wsj.com/arts-culture/books/daniel-kahneman-assisted-suicide-9fb16124?mod=arts-culture_lead_pos2" rel="noopener noreferrer" target="_blank"> assisted suicide</a> and the question of its rationality.</li><li><a href="https://www.chronicle.com/article/the-online-overhaul" rel="noopener noreferrer" target="_blank">Virtual classes aren\'t going anywhere</a>. Online lectures are fine and could be great. Ideally, though, they shouldn\'t get rid of classroom time but create time for more engaging, interactive, and seminar-style activities. (Beware paywall.)</li></ol><p><br></p>',
    featured: true,
    tags: []
  }
];
