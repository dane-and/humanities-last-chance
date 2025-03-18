
import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/lib/types/article';
import { getArticlesByCategory } from '@/lib/queries/articleQueries';
import { getArticlesFromStorage } from '@/lib/utils/storage/articleStorage';
import { toast } from 'sonner';

// Pre-baked articles that will be included in the static site
const preBakedArticles: Article[] = [
  {
    id: 'hamlet-prozac',
    title: 'Should Hamlet Take Prozac?',
    slug: 'should-hamlet-take-prozac',
    author: 'Admin',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }),
    category: 'Blog',
    image: '/lovable-uploads/f9c1d914-1205-4196-ac9c-9ebe238e7d01.png',
    imageCaption: 'Hamlet contemplating',
    excerpt: 'Exploring the intersection of modern psychiatry and Shakespeare\'s most complex character.',
    content: `<p>Imagine it: the "To be, or not to be" soliloquy without "the pangs of dispriz'd love" or "the pale cast of thought." Instead—"To die, to sleep"—and that's it. The soliloquy ends there. No despair. No impassioned pleas. Just sleep. That, I assume, is what Hamlet's soliloquy would be if he took Prozac, or any of the other SSRIs.</p>
<p>Our instinct is to recoil at the thought of Hamlet on antidepressants. His melancholy is the fabric of his insight and philosophical depth. Without his suffering, what would remain of Shakespeare's most complex character? But in denying him this modern remedy, we are making Hamlet our own sacrificial victim, condemning him to torment for our aesthetic pleasure and edification.</p>
<p>This tension shows that our moral and aesthetic judgments often run on separate tracks. Morally, we should want Hamlet's suffering relieved, but in art we want his pain. Shakespeare exploits this contradiction and lets us revel in Hamlet's suffering. We love to see him a "quintessence of dust." We're relieved that he, who ​​"could be bounded in a nutshell, and count [him]self a king of infinite space," has "bad dreams" that hold him back—bad dreams just like ours, which make us more mediocre in our contentedness than Hamlet is in his anguish.</p>
<p>Who hasn't known somebody who's internalized the Romantic (for it was the Romantics who gave Hamlet his central place in Western culture) belief that suffering is noble: friends or family who wear their suffering as the outward symbol of their depth and seriousness and fortitude? Who hasn't suffered by being close to such people? Reading Hamlet as a validation of psychological torment could prove disastrous, both for those who valorize themselves for their suffering and for the concerned third-parties who, by necessity, get involved with it.</p>
<p>Shakespeare's relationship to Hamlet mirrors Iago's to Othello. Shakespeare and Iago both are architects of suffering. Hamlet himself picks up his compass and draws a blueprint for the fall of Rosencrantz and Guildenstern. And who would wish otherwise? We thrill in their deaths just as we thrill in Claudius' and, alas, as we thrill in Hamlet's.</p>
<p>In our humane post-post-Freudian age, Hamlet's symptoms—low mood, anhedonia, indecision, suicidal ideation—are treatable conditions. Modern mental health treatment aims to alleviate suffering without diminishing a person's essential character. The modern therapeutic ideal might suggest that a properly medicated Hamlet might keep both his acuity and the ability to act decisively. All is for the best in this best of possible worlds, says Dr. Pangloss.</p>
<p>Opposed to this view stands Shakespeare, unsentimental. In Hamlet, he creates a character for whom knowledge and suffering are the same.</p>
<p>That brings us back to the soliloquy. Prozac and other SSRIs stop the reuptake of serotonin, which helps regulate mood and anxiety. Prozac has a moderating effect, but Hamlet captivates us because he is immoderate. "For who would bear" the evils that people have to put up with, Hamlet asks, when you can sink a "bare bodkin" in your guts and end it all? Who can doubt that Prozac, by chemically reconfiguring Hamlet's brain, would convince him to "sleep" before unspooling all his tortured threads of thought?</p>
<p>The only fictional character that I can think of who resembles Hamlet and takes Prozac is Tony Soprano. But in The Sopranos Prozac and other SSRIs have a role in the narrative entirely different from the role that they have for real patients. Tony's getting prescribed Prozac early on, and his later prescription of other drugs and struggles with their side-effects, are reminders of his inner turmoil, not solutions to it. They are a metonym for the fragile injured self behind the big-man exterior.</p>
<p>We might be tempted to conclude from all this that whereas mental illness should be diagnosed, treated, and cured in real life, to reduce suffering for the people themselves and those around them, art licenses if not demands us to exploit suffering. We might then say that we abhor suffering in real life, like all good humane people should, but, being equally broad-minded, we are willing to get satisfaction from its fictional representation.</p>
<p>Soothing as this sounds, this solution ultimately breaks down. The difference between life and art is one of degree, not kind, and the consequence is that even if Hamlet were real our instincts would probably be to make him suffer rather than cut the soliloquy short. We've known people who've made excuses not to feel bad for people whose homes have burned down, because the homes were nice and close to the beach. We've seen people thrill when one man guns down another, because one of them is a CEO. You might chafe at these responses, but you shouldn't think that you can't or don't have similar responses when the circumstances are different.</p>`,
    featured: true,
    tags: ['Literature'],
    comments: []
  }
];

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBlogPosts = useCallback(() => {
    console.log("Fetching blog posts...");
    setIsLoading(true);
    setError(null);
    
    try {
      // Get all articles from storage
      const articlesFromStorage = getArticlesFromStorage();
      console.log(`Retrieved ${articlesFromStorage.length} total articles from storage`);
      
      // Always use the pre-baked articles as the primary source
      const allArticles = [...preBakedArticles];
      
      // Add any additional articles from storage that aren't already in pre-baked
      // (skip this in production for true static content)
      if (process.env.NODE_ENV !== 'production') {
        const storageArticleIds = new Set(allArticles.map(a => a.id));
        const additionalArticles = articlesFromStorage.filter(
          article => !storageArticleIds.has(article.id) && article.category.toLowerCase() === 'blog'
        );
        
        if (additionalArticles.length > 0) {
          console.log(`Adding ${additionalArticles.length} additional articles from storage`);
          allArticles.push(...additionalArticles);
        }
      }
      
      // Get articles with 'Blog' category
      let blogArticles = getArticlesByCategory('Blog', undefined, allArticles);
      
      // If no exact matches, try case-insensitive match
      if (blogArticles.length === 0) {
        console.log("No exact 'Blog' category matches, trying case-insensitive search");
        blogArticles = allArticles.filter(
          article => article.category.toLowerCase() === 'blog'
        );
      }
      
      // Sort articles by date (newest first) and update state
      if (blogArticles.length > 0) {
        const sortedArticles = [...blogArticles].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setBlogPosts(sortedArticles);
      } else {
        console.warn("No blog articles found after searching");
        setBlogPosts([]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error fetching blog posts';
      console.error('Error fetching blog posts:', errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));
      toast.error("Failed to load blog posts");
      
      // Fallback to pre-baked articles on error
      setBlogPosts(preBakedArticles);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Helper function removed as we're not going to use any sample articles except our pre-baked ones
  
  useEffect(() => {
    fetchBlogPosts();
    
    // Add event listener for article updates with a specific name for debugging
    const handleArticlesUpdatedEvent = () => {
      console.log('articlesUpdated event detected in useBlogPosts, refreshing posts');
      fetchBlogPosts();
    };
    
    window.addEventListener('articlesUpdated', handleArticlesUpdatedEvent);
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('articlesUpdated', handleArticlesUpdatedEvent);
    };
  }, [fetchBlogPosts]);
  
  return { blogPosts, isLoading, error, fetchBlogPosts };
};
