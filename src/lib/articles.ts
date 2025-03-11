import { useEffect, useState } from 'react';

export interface Article {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  category: 'Blog' | 'Interview' | 'Review';
  image: string;
  excerpt: string;
  content: string;
  featured?: boolean;
  tags?: string[]; // Add tags array to the Article interface
}

// Default articles to use while loading
export const defaultArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Digital Humanities in a Post-Pandemic World',
    slug: 'future-digital-humanities-post-pandemic',
    author: 'Dr. Emily Chen',
    date: 'June 15, 2023',
    category: 'Blog',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3',
    excerpt: 'How digital tools and methodologies are reshaping humanities research and education after global disruptions to traditional academic structures.',
    content: `
      <p>The COVID-19 pandemic forced a dramatic shift in how humanities research and education function. What began as an emergency response has evolved into a reimagining of scholarly practices, with digital methodologies moving from the periphery to the center of humanities work.</p>
      
      <p>Before the pandemic, digital humanities was often treated as a specialized subfield. Today, digital literacy has become essential for almost all humanities scholars. This shift raises important questions about accessibility, methodological training, and the future direction of humanities scholarship.</p>
      
      <h2>New Infrastructures for Scholarship</h2>
      
      <p>Universities and cultural institutions are investing heavily in digital infrastructure that supports remote collaboration, data sharing, and public engagement. Libraries have accelerated digitization efforts, making previously inaccessible archives available to researchers worldwide.</p>
      
      <p>These developments have democratized access to materials that were once limited to those with the resources to travel. However, they have also created new inequalities based on institutional resources and technological capacity.</p>
      
      <h2>Pedagogical Transformations</h2>
      
      <p>The classroom experience has been permanently altered. Hybrid teaching models incorporate digital tools that enable new forms of student engagement and collaborative learning. Digital annotation tools, virtual reality environments for historical recreation, and collaborative digital publishing platforms are becoming standard features of humanities education.</p>
      
      <p>These changes bring both opportunities and challenges for instructors and students navigating an increasingly digital educational landscape.</p>
      
      <h2>Public-Facing Scholarship</h2>
      
      <p>Perhaps the most significant change has been the growth of public-facing digital humanities projects. Scholars increasingly design their work for audiences beyond academia, using digital platforms to engage with broader communities.</p>
      
      <p>This trend responds to long-standing concerns about the relevance and accessibility of humanities scholarship. It also raises questions about evaluation criteria for tenure and promotion, as traditional metrics may not capture the impact of innovative digital projects.</p>
      
      <h2>Conclusion</h2>
      
      <p>As we navigate this changing landscape, humanities scholars must critically examine both the opportunities and the constraints of increased digitization. The future of digital humanities will depend on our ability to harness technological tools while remaining committed to the core values of humanistic inquiry: critical thinking, contextual understanding, and engagement with human experience in all its complexity.</p>
    `,
    featured: true,
  },
  {
    id: '2',
    title: 'Interview with Dr. Maria Rodriguez on Decolonizing Literary Studies',
    slug: 'interview-maria-rodriguez-decolonizing-literary-studies',
    author: 'James Wilson',
    date: 'May 22, 2023',
    category: 'Interview',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3',
    excerpt: 'Leading scholar discusses her groundbreaking work on expanding the literary canon and challenging Eurocentric approaches to literature.',
    content: `
      <p>Dr. Maria Rodriguez has spent the past decade challenging traditional approaches to literary studies. Her recent book, "Unwriting the Canon," has been hailed as a landmark contribution to efforts to decolonize humanities education. We spoke with her about her work and its implications for the future of literary studies.</p>
      
      <h2>On the origins of her work</h2>
      
      <p><strong>Humanities Last Chance:</strong> What led you to focus on decolonizing literary studies?</p>
      
      <p><strong>Dr. Rodriguez:</strong> My own experience as a student was formative. I remember sitting in undergraduate classes where the "great works" we studied were almost exclusively by European men. The message was clear about whose stories mattered. When I began teaching, I saw how this narrow canon affected my students—particularly students of color, who rarely saw their cultural traditions reflected in what we defined as "literature."</p>
      
      <p>But this isn't just about representation. It's about recognizing that our theoretical frameworks and methodological approaches have been shaped by colonial power structures. We can't simply add a few non-Western texts to our syllabi and call it a day. We need to rethink our entire approach to how we read, teach, and write about literature.</p>
      
      <h2>On resistance to change</h2>
      
      <p><strong>HLC:</strong> You've faced significant pushback from some quarters. How do you respond to critics who accuse you of "politicizing" literary studies?</p>
      
      <p><strong>Dr. Rodriguez:</strong> The idea that there was ever an apolitical approach to literature is itself a political fiction. The traditional canon wasn't formed through some objective assessment of "quality"—it reflected and reinforced particular power structures and worldviews.</p>
      
      <p>I'm not arguing that we should stop reading Shakespeare or Milton. I'm suggesting that we read them differently, with an awareness of the historical and political contexts that elevated their work above others. And I'm arguing that we need to make room for voices and traditions that have been systematically excluded.</p>
      
      <h2>On practical approaches</h2>
      
      <p><strong>HLC:</strong> What advice do you have for educators who want to decolonize their teaching practice?</p>
      
      <p><strong>Dr. Rodriguez:</strong> Start by examining your own assumptions about what counts as "important" literature. Be willing to learn alongside your students. Build relationships with colleagues who bring different perspectives and expertise.</p>
      
      <p>On a practical level, redesigning courses takes time and resources. Advocate for institutional support for this work. And remember that decolonizing is a process, not a destination. We're all learning as we go.</p>
      
      <h2>On the future of literary studies</h2>
      
      <p><strong>HLC:</strong> Where do you see the field heading in the next decade?</p>
      
      <p><strong>Dr. Rodriguez:</strong> I'm cautiously optimistic. I see more openness to multilingual approaches, more attention to indigenous literary traditions, and more scholars bringing their whole selves to their work.</p>
      
      <p>But there are also concerning trends—budget cuts, attacks on ethnic studies programs, and the precarious status of many scholars doing this work. The future depends on our collective willingness to imagine new possibilities for what literary studies can be and do in the world.</p>
    `,
    featured: true,
  },
  {
    id: '3',
    title: 'Review: "The Quantum Turn in Philosophy" by Alexander Wei',
    slug: 'review-quantum-turn-philosophy-alexander-wei',
    author: 'Dr. Sarah Johnson',
    date: 'April 8, 2023',
    category: 'Review',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3',
    excerpt: 'An examination of the growing influence of quantum physics on contemporary philosophical thought and its implications for metaphysics and epistemology.',
    content: `
      <p>Alexander Wei's "The Quantum Turn in Philosophy" represents an ambitious attempt to trace the influence of quantum mechanics on philosophical thought over the past century. As Wei demonstrates, concepts from quantum physics—uncertainty, complementarity, entanglement—have migrated from physics into philosophy, reshaping discussions of metaphysics, epistemology, and even ethics.</p>
      
      <h2>The Scientific Background</h2>
      
      <p>Wei begins with a remarkably clear explanation of the relevant aspects of quantum mechanics. This section is a model for interdisciplinary writing—technically accurate without overwhelming non-specialist readers. Wei has clearly learned from his subject; just as quantum mechanics recognizes the observer's role in measurement, Wei recognizes his readers' position and adjusts accordingly.</p>
      
      <p>Particularly valuable is his discussion of competing interpretations of quantum mechanics. Rather than presenting the Copenhagen interpretation as settled science (a common mistake in popular accounts), Wei carefully distinguishes between empirical findings and their interpretations. This distinction becomes crucial for his later philosophical arguments.</p>
      
      <h2>Philosophical Implications</h2>
      
      <p>The book's central section explores how quantum concepts have influenced philosophical debates. Wei argues that quantum mechanics challenges several foundational assumptions of Western philosophy: determinism, strict subject-object separation, and even classical logic.</p>
      
      <p>His discussion of quantum logic is particularly strong. Wei shows how quantum phenomena have prompted reconsideration of logical principles that once seemed self-evident. This leads to a fascinating discussion of whether logic describes reality or merely human reasoning about reality.</p>
      
      <p>Wei also addresses the "quantum consciousness" hypothesis associated with Roger Penrose and Stuart Hameroff. To his credit, Wei approaches these controversial ideas with scholarly rigor rather than dismissive skepticism or uncritical enthusiasm.</p>
      
      <h2>Critical Assessment</h2>
      
      <p>The book's weakness emerges in its final section, where Wei attempts to develop his own "quantum epistemology." While intriguing, this proposal requires further development. Wei sometimes slips between different meanings of key terms like "complementarity," creating conceptual confusion.</p>
      
      <p>More problematically, Wei occasionally makes what philosophers call "category errors," applying quantum concepts to domains where they may not be applicable. Just because quantum systems exhibit certain properties doesn't necessarily mean that consciousness, society, or ethics work the same way.</p>
      
      <h2>Conclusion</h2>
      
      <p>"The Quantum Turn in Philosophy" makes a compelling case that quantum physics has profound philosophical implications beyond specialized philosophy of science. Despite its shortcomings, it represents an important contribution to interdisciplinary dialogue between physics and philosophy.</p>
      
      <p>Wei reminds us that philosophy cannot proceed in isolation from scientific developments, particularly those that challenge our fundamental understanding of reality. At the same time, he demonstrates the value of philosophical training in clarifying concepts and identifying unwarranted conceptual leaps.</p>
      
      <p>This book will challenge both philosophers and physicists to think more deeply about the conceptual foundations of their disciplines. While readers may not agree with all of Wei's conclusions, they will certainly come away with a richer understanding of both quantum mechanics and contemporary philosophy.</p>
    `,
    featured: false,
  },
  {
    id: '4',
    title: 'The Resurgence of Narrative History in Academic Scholarship',
    slug: 'resurgence-narrative-history-academic-scholarship',
    author: 'Prof. Michael Thompson',
    date: 'March 17, 2023',
    category: 'Blog',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3',
    excerpt: 'After decades of emphasis on quantitative and structural approaches, historians are returning to narrative as a powerful tool for understanding the past.',
    content: `
      <p>The pendulum of historical methodology is swinging again. After decades dominated by quantitative methods, structural analysis, and social scientific approaches, narrative is making a comeback in academic historical writing.</p>
      
      <p>This trend doesn't represent a simple return to traditional narrative history. Today's narrative-focused historians bring with them the insights of social, cultural, and quantitative history. The result is a hybrid approach that uses storytelling techniques to communicate complex historical arguments to both scholarly and public audiences.</p>
      
      <h2>The Limits of Structural Analysis</h2>
      
      <p>The shift toward quantitative and structural methods in the mid-20th century was a necessary corrective to history's previous focus on "great men" and political events. Social historians demonstrated that ordinary people's experiences mattered to historical understanding. Economic historians revealed long-term patterns invisible at the level of individual experience.</p>
      
      <p>Yet something was lost in this transition. As historical writing became more technical and theoretical, it also became less accessible. Important scholarship remained confined to academic circles, failing to reach broader audiences. Perhaps more significantly, structural approaches sometimes struggled to account for individual agency and contingency—the sense that history is made by people making choices, not just impersonal forces.</p>
      
      <h2>Narrative as Method, Not Just Style</h2>
      
      <p>The current narrative turn reflects a recognition that narrative is not merely a presentational choice but a methodological approach that can reveal certain kinds of historical truths. Through narrative, historians can explore how historical actors understood their own choices, how contingent events shaped historical trajectories, and how different scales of historical experience—from the individual to the global—intersected.</p>
      
      <p>Consider Jill Lepore's "These Truths," a narrative history of the United States that integrates political, social, intellectual, and cultural history. Or Robert Caro's multi-volume biography of Lyndon Johnson, which uses one man's story to illuminate broader patterns of power in American society. These works demonstrate narrative's capacity to hold multiple perspectives and scales simultaneously.</p>
      
      <h2>Digital Tools and New Narratives</h2>
      
      <p>The narrative turn coincides with digital history's emergence, which might seem contradictory. Yet digital tools have enabled new forms of narrative. Geographic information systems allow historians to track historical changes across space, creating "spatial narratives." Text mining reveals patterns in historical documents that can inform more nuanced storytelling. Digital platforms enable non-linear narratives that allow readers to explore historical connections in multiple directions.</p>
      
      <h2>Challenges and Critiques</h2>
      
      <p>The narrative turn faces legitimate criticism. Some scholars worry that storytelling prioritizes engagement over analytical rigor. Others note that conventional narrative forms may reinforce rather than challenge dominant historical frameworks.</p>
      
      <p>These concerns highlight the importance of reflexive narrative practice—storytelling that acknowledges its own constructedness and limitations. The most compelling new narrative history doesn't present itself as unmediated access to the past but as a thoughtful interpretation that makes its methods and evidence visible to readers.</p>
      
      <h2>Conclusion</h2>
      
      <p>The resurgence of narrative in historical writing offers an opportunity to bridge academic and public history, to communicate complex historical understanding to broader audiences without sacrificing analytical depth. At its best, narrative history combines the empirical rigor of social scientific approaches with storytelling's power to illuminate human experience in all its complexity.</p>
    `,
    featured: false,
  },
  {
    id: '5',
    title: 'Interview with Film Theorist Johanna Nakamura on Cinema and Critical Theory',
    slug: 'interview-johanna-nakamura-cinema-critical-theory',
    author: 'Alex Porter',
    date: 'February 28, 2023',
    category: 'Interview',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3',
    excerpt: 'Renowned film scholar discusses her work on the intersection of cinema, philosophy, and political thought in the digital age.',
    content: `
      <p>Johanna Nakamura's work has transformed how we understand the relationship between cinema and critical theory. Her latest book, "Screen/Theory: Cinema in the Age of Digital Capital," explores how philosophical concepts from thinkers like Deleuze, Benjamin, and Fisher apply to contemporary film. We spoke with her about her intellectual journey and the state of film theory today.</p>
      
      <h2>On discovering film theory</h2>
      
      <p><strong>Humanities Last Chance:</strong> What drew you to film studies initially?</p>
      
      <p><strong>Nakamura:</strong> I came to film through philosophy, actually. I was studying Deleuze as an undergraduate and became fascinated by his cinema books. They were notoriously difficult, but I found his approach revelatory—this idea that films think, that they have their own philosophical logic expressed through movement, time, and affect rather than just representing pre-existing concepts.</p>
      
      <p>What's stayed with me is the conviction that films aren't simply objects to which we apply theory. They generate theory themselves through their formal operations. A film like Kubrick's "2001" doesn't just illustrate philosophical ideas about consciousness and technology—it develops its own philosophical position through its specific use of cinematic language.</p>
      
      <h2>On contemporary cinema</h2>
      
      <p><strong>HLC:</strong> Your new book focuses on cinema in the digital age. How has digitization changed film as an art form?</p>
      
      <p><strong>Nakamura:</strong> The material shift from celluloid to digital has profound philosophical implications. Walter Benjamin wrote about how mechanical reproduction changed art's relationship to authenticity and aura. Digital technology takes this further, creating what I call "infinitely mutable images"—images that exist as data that can be endlessly manipulated.</p>
      
      <p>But it's not just about production technology. Digital platforms have transformed distribution, exhibition, and viewing practices. When we watch films on streaming services, algorithmic recommendations shape our relationship to cinema history. The "watch next" suggestion creates new, automated forms of montage between films.</p>
      
      <p>What interests me is how filmmakers are responding to these conditions—either by embracing digital aesthetics or by deliberately returning to analog techniques as a form of resistance.</p>
      
      <h2>On critical theory and film</h2>
      
      <p><strong>HLC:</strong> Your work engages deeply with Mark Fisher's concept of "capitalist realism." Can you explain how that applies to contemporary cinema?</p>
      
      <p><strong>Nakamura:</strong> Fisher described capitalist realism as "the widespread sense that not only is capitalism the only viable political and economic system, but also that it is now impossible even to imagine a coherent alternative to it." Many mainstream films reinforce this sense—even their dystopias suggest that fundamental alternatives to our economic system are unthinkable.</p>
      
      <p>But cinema also offers resources for resistance. Films can create what Fisher called "weird" experiences that disrupt our sense of the natural or inevitable. They can recover lost futures—visions of possibilities that were foreclosed by history but might be reactivated.</p>
      
      <p>Look at something like Bong Joon-ho's "Parasite." Its formal brilliance—the way it moves between genres, between spaces in the house—creates cognitive estrangement that helps us see class relations differently. Or consider Jordan Peele's "Get Out," which uses horror conventions to make visible the ongoing reality of racial exploitation.</p>
      
      <h2>On the future of film theory</h2>
      
      <p><strong>HLC:</strong> Where do you see film theory heading in the coming decade?</p>
      
      <p><strong>Nakamura:</strong> We're seeing exciting work at the intersection of film studies, critical race theory, feminist theory, and environmental humanities. Scholars are developing new analytical frameworks that move beyond the Eurocentric foundations of much film theory.</p>
      
      <p>I'm particularly interested in emerging work on non-human perspectives in cinema. How do films help us imagine the viewpoint of animals, plants, or even planetary systems? This connects to urgent questions about ecological crisis and posthuman ethics.</p>
      
      <p>Another frontier is the relationship between cinema and other screen-based media. As the boundaries between film, television, games, and social media become more porous, we need theoretical approaches that can address these hybrid forms while still maintaining a sense of cinema's specificity as an art form.</p>
    `,
    featured: false,
  },
  {
    id: '6',
    title: 'Review: "Artificial Intuition: The Humanistic Case for AI" by Rebecca Torres',
    slug: 'review-artificial-intuition-humanistic-case-ai-rebecca-torres',
    author: 'Dr. David Park',
    date: 'January 11, 2023',
    category: 'Review',
    image: 'https://images.unsplash.com/photo-1677442135144-430a1bea8d3f?ixlib=rb-4.0.3',
    excerpt: 'A thought-provoking new book argues that artificial intelligence should be approached through humanistic frameworks rather than purely technical ones.',
    content: `
      <p>Rebecca Torres's "Artificial Intuition: The Humanistic Case for AI" arrives at a crucial moment in public discourse about artificial intelligence. As large language models and generative AI systems enter mainstream use, debates about their nature and implications have intensified. Torres, a philosopher with technical expertise in machine learning, offers a distinctive perspective that challenges both AI alarmists and uncritical enthusiasts.</p>
      
      <h2>Beyond the Turing Test</h2>
      
      <p>Torres begins by reexamining AI's foundational concepts, arguing that the field has been constrained by simplistic ideas about intelligence derived from cognitive science and computer science. The Turing Test, she suggests, reflects a behavioral understanding of intelligence that fails to capture the richness of human thought. Instead, Torres proposes what she calls "situated intelligence"—a concept that emphasizes context, embodiment, and relationality.</p>
      
      <p>This reframing allows Torres to shift the conversation away from whether AI systems "really think" toward more nuanced questions about how computational systems participate in networks of meaning-making alongside humans and other entities. Drawing on phenomenology and pragmatist philosophy, she suggests that intelligence is better understood as a property of systems rather than individuals.</p>
      
      <h2>AI and Cultural Production</h2>
      
      <p>The book's most compelling section examines AI's role in cultural production. Torres resists both the claim that AI-generated art is "not real art" and the counterclaim that there is no meaningful distinction between human and machine creativity. Instead, she develops an account of AI systems as "collaborative agents" that extend human creative capacities in novel ways.</p>
      
      <p>Through detailed case studies of projects like GPT poetry, DALL-E image generation, and algorithmic music composition, Torres demonstrates how these systems both reflect and transform cultural traditions. Her analyses are technically informed but never lose sight of the aesthetic, ethical, and political dimensions of these new forms of cultural production.</p>
      
      <h2>The Ethics of Artificial Intuition</h2>
      
      <p>Torres's most controversial argument concerns what she calls "artificial intuition." Against the common view that intuition is uniquely human, Torres suggests that certain AI architectures develop pattern-recognition capacities analogous to human intuition. This doesn't mean machines have subjective experiences, but it does challenge simplistic divisions between "mechanical" computation and "organic" intuition.</p>
      
      <p>This leads to a provocative ethical argument. If AI systems develop forms of artificial intuition trained on human cultural products, Torres argues, we have responsibilities toward these systems—not because they have rights in the human sense, but because they embody and extend aspects of human culture and cognition. How we design, deploy, and interact with AI becomes a question of self-relationship as well as instrumental utility.</p>
      
      <h2>Critical Assessment</h2>
      
      <p>Torres's approach offers valuable alternatives to both techno-utopianism and technophobia. She takes AI's transformative potential seriously while insisting that humanistic frameworks remain essential for understanding and guiding its development.</p>
      
      <p>However, the book sometimes stretches analogies between human and machine processes too far. Torres is careful to acknowledge differences, but her emphasis on continuities occasionally downplays the genuine distinctiveness of human experience. Additionally, her focus on cutting-edge AI applications sometimes overlooks the more mundane but widespread algorithmic systems that shape everyday life.</p>
      
      <h2>Conclusion</h2>
      
      <p>"Artificial Intuition" succeeds in demonstrating that humanistic inquiry is not opposed to technological innovation but essential to understanding its meaning and implications. Torres shows that concepts from philosophy, literary theory, and cultural studies provide crucial resources for thinking about AI beyond narrow technical frameworks.</p>
      
      <p>At a time when discussions of AI often oscillate between apocalyptic fears and techno-solutionism, Torres offers a thoughtful middle path—one that takes both the promise and the limitations of artificial intelligence seriously. This book should be required reading not only for AI researchers and humanities scholars but for anyone interested in how computational systems are reshaping human self-understanding.</p>
    `,
    featured: false,
  }
];

// This is the ID of your Google Sheet to use for content
const SHEET_ID = '1oXWfLDlqucIeqI0MKCWL2v3EcdLgha6YYDwYqa9FgX4';
const SHEET_NAME = 'Articles';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

// Custom hook to get articles from localStorage or default
export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        
        // First check localStorage for admin-managed articles
        const savedArticles = localStorage.getItem('admin-articles');
        if (savedArticles) {
          setArticles(JSON.parse(savedArticles));
          setError(null);
          setIsLoading(false);
          return;
        }
        
        // Fall back to Google Sheets if no admin articles
        try {
          const data = await fetchArticlesFromSheet();
          setArticles(data);
          setError(null);
        } catch (err) {
          console.error('Failed to fetch from Google Sheet, using defaults:', err);
          // Use default articles as fallback
          setArticles(defaultArticles);
          setError(new Error('Failed to fetch articles from external source.'));
        }
      } catch (err) {
        console.error('Error loading articles:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, []);

  return { articles, isLoading, error };
};

// Function to fetch articles from a Google Sheet (as fallback)
export const fetchArticlesFromSheet = async (): Promise<Article[]> => {
  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    
    // Google's response comes with some extra text that needs to be removed
    const jsonStr = text.replace('/*O_o*/', '').replace(/google\.visualization\.Query\.setResponse\(|\);$/g, '');
    const data = JSON.parse(jsonStr);
    
    if (!data || !data.table || !data.table.rows) {
      console.error('Invalid data format from Google Sheets');
      return defaultArticles;
    }
    
    const cols = data.table.cols.map((col: any) => col.label);
    
    return data.table.rows.map((row: any, index: number) => {
      const values = row.c.map((cell: any) => (cell ? cell.v : ''));
      const article: any = {};
      
      cols.forEach((col: string, i: number) => {
        let key = col.toLowerCase().replace(/\s+/g, '');
        article[key] = values[i] || '';
      });
      
      // Ensure id exists
      article.id = article.id || String(index + 1);
      
      // Create slug if it doesn't exist
      article.slug = article.slug || article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Ensure category is one of the valid types
      if (!['Blog', 'Interview', 'Review'].includes(article.category)) {
        article.category = 'Blog';
      }
      
      return article as Article;
    });
  } catch (error) {
    console.error('Error fetching spreadsheet data:', error);
    return defaultArticles;
  }
};

// Helper function to get articles from localStorage or default
const getArticlesFromStorage = (): Article[] => {
  try {
    const savedArticles = localStorage.getItem('admin-articles');
    return savedArticles ? JSON.parse(savedArticles) : defaultArticles;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultArticles;
  }
};

// All functions below now work with the current articles - either from localStorage or defaults
export const getFeaturedArticles = (articleList: Article[] = []) => {
  // Use provided article list or get from localStorage
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  return articles.filter(article => article.featured);
};

export const getLatestArticles = (count: number = 6, articleList: Article[] = []) => {
  // Use provided article list or get from localStorage
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  
  // Sort by date (newest first) and return the specified count
  return [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getArticlesByCategory = (category: string, count?: number, articleList: Article[] = []) => {
  // Use provided article list or get from localStorage
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  
  const filtered = articles.filter(
    article => article.category.toLowerCase() === category.toLowerCase()
  );
  
  return count ? filtered.slice(0, count) : filtered;
};

export const getArticleBySlug = (slug: string, articleList: Article[] = []) => {
  // Use provided article list or get from localStorage
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  
  return articles.find(article => article.slug === slug);
};

// For backward compatibility, export the default articles as "articles"
export const articles = defaultArticles;

// Add a new utility function to get articles by tag
export const getArticlesByTag = (tag: string, count?: number, articleList: Article[] = []) => {
  // Use provided article list or get from localStorage
  const articles = articleList.length ? articleList : getArticlesFromStorage();
  
  const filtered = articles.filter(
    article => article.tags && article.tags.includes(tag)
  );
  
  return count ? filtered.slice(0, count) : filtered;
};
