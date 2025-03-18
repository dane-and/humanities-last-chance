
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleBySlug, defaultArticles } from '@/lib/articles';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ArticleComments from '@/components/ArticleComments';
import { getArticlesFromStorage } from '@/lib/utils/storage/articleStorage';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import OptimizedImage from '@/components/OptimizedImage';
import { useIsMobile } from '@/hooks/use-mobile';
import { Article } from '@/lib/types/article';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadArticle = () => {
      setLoading(true);
      console.log(`Loading article with slug: ${slug}`);
      
      // First try to get from storage
      const articles = getArticlesFromStorage();
      console.log("All articles:", articles);
      
      // Find by slug
      let article = articles.find(a => a.slug === slug);
      
      // If not found in storage, check default articles
      if (!article && defaultArticles.length > 0) {
        console.log("Article not found in storage, checking defaults");
        article = defaultArticles.find(a => a.slug === slug);
        console.log("Found in defaults:", article);
      }
      
      setCurrentArticle(article || null);
      setLoading(false);
    };
    
    loadArticle();
  }, [slug, refreshCounter]);

  const handleCommentAdded = () => {
    setRefreshCounter(prev => prev + 1);
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentArticle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Button onClick={handleGoBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-10 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              onClick={handleGoBack}
              className="mr-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <h1 className="text-3xl font-serif font-bold">{currentArticle.title}</h1>
          </div>
          
          <div className="mb-4 block">
            <span className="text-muted-foreground text-sm inline-block">{currentArticle.date}</span>
            <span className="text-muted-foreground mx-2 text-sm inline-block">•</span>
            <a 
              href={`/articles/${currentArticle.category.toLowerCase()}`} 
              className="text-primary font-medium text-sm inline-block"
            >
              {currentArticle.category}
            </a>
          </div>
          
          <p className="text-lg text-muted-foreground mb-6">{currentArticle.excerpt}</p>
          
          {currentArticle.image && currentArticle.image.trim() !== '' && (
            <div className="mb-6 overflow-hidden rounded-lg">
              <AspectRatio ratio={16 / 9}>
                <OptimizedImage
                  src={currentArticle.image}
                  alt={currentArticle.title}
                  className="w-full h-full object-cover object-top"
                  caption={currentArticle.imageCaption || ''}
                />
              </AspectRatio>
            </div>
          )}
          
          <article className="prose prose-slate max-w-none [&_a]:text-[#0EA5E9] [&_a]:no-underline hover:[&_a]:text-[#0EA5E9]/80">
            <div dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
          </article>
          
          {currentArticle.tags && currentArticle.tags.length > 0 && (
            <div className="mt-4 pt-2 border-t">
              <div className="flex flex-wrap gap-2">
                {currentArticle.tags.map(tag => (
                  <a
                    key={tag}
                    href={`/tag/${tag.toLowerCase()}`}
                    className="bg-secondary px-3 py-1 rounded-full text-sm hover:bg-secondary/80 transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          )}
          
          <ArticleComments 
            articleId={currentArticle.id} 
            comments={currentArticle.comments || []}
            onCommentAdded={handleCommentAdded}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlePage;
