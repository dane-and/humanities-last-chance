
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleBySlug } from '@/lib/articles';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug || '');

  if (!article) {
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
            <div className="flex items-center gap-3 mb-2 text-sm">
              <a href={`/articles/${article.category.toLowerCase()}`} className="text-primary font-medium">
                {article.category}
              </a>
              <span className="text-muted-foreground">{article.date}</span>
            </div>
            
            <h1 className="text-4xl font-serif font-bold mb-4">{article.title}</h1>
            
            <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>
            
            <div className="text-sm text-muted-foreground">
              By <span className="font-medium">{article.author}</span>
            </div>
          </header>
          
          <div className="mb-10 h-80 md:h-96 overflow-hidden rounded-lg">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <article className="prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>
          
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t">
              <h3 className="text-lg font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlePage;
