
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleBySlug } from '@/lib/articles';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ArticleComments from '@/components/ArticleComments';
import { getArticlesFromStorage } from '@/lib/utils/storage/articleStorage';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import CaptionedImage from '@/components/CaptionedImage';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug || '');
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [currentArticle, setCurrentArticle] = useState(article);

  useEffect(() => {
    if (article) {
      const articles = getArticlesFromStorage();
      const updatedArticle = articles.find(a => a.slug === article.slug);
      if (updatedArticle) {
        setCurrentArticle(updatedArticle);
      }
    }
  }, [article, refreshCounter]);

  if (!currentArticle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleCommentAdded = () => {
    setRefreshCounter(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <header className="mb-8">
            <h1 className="text-3xl font-serif font-bold mb-4">{currentArticle.title}</h1>
            
            <div className="flex items-center gap-1 mb-6 text-sm">
              <a href={`/articles/${currentArticle.category.toLowerCase()}`} className="text-primary font-medium">
                {currentArticle.category}
              </a>
              <span className="text-muted-foreground">• {currentArticle.date}</span>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">{currentArticle.excerpt}</p>
          </header>
          
          {currentArticle.image && (
            <div className="mb-10 overflow-hidden rounded-lg">
              <AspectRatio ratio={21 / 9}>
                <CaptionedImage
                  src={currentArticle.image}
                  alt={currentArticle.title}
                  caption={currentArticle.imageCaption || ''}
                  imageClassName="w-full h-full object-cover"
                  captionClassName="absolute bottom-0 left-0 right-0 bg-black/30 text-white p-2 text-xs"
                />
              </AspectRatio>
            </div>
          )}
          
          <article className="prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
          </article>
          
          {currentArticle.tags && currentArticle.tags.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="text-lg font-medium mb-3">Tags</h3>
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
