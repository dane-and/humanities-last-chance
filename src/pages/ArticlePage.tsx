
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { fetchArticleBySlug } from '@/lib/sanity';
import ArticleLoading from '@/components/article/ArticleLoading';
import ArticleNotFound from '@/components/article/ArticleNotFound';
import ArticlePageContent from '@/components/article/ArticlePageContent';
import { Article } from '@/lib/types/article';
import { getNormalizedCategory } from '@/lib/utils/categoryUtils';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [rawCategoryValue, setRawCategoryValue] = useState<any>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      setLoading(true);
      console.log(`Loading article with slug: ${slug} from Sanity`);
      
      try {
        const article = await fetchArticleBySlug(slug);
        console.log("Fetched article from Sanity:", article);
        
        if (article) {
          // Store raw category value for debugging
          setRawCategoryValue(article.category);
          
          // Debug category type and value
          console.log(`Article category from Sanity:`, {
            type: typeof article.category,
            value: article.category
          });
          
          // Debug the tags
          console.log(`Article tags from Sanity:`, article.tags);
          
          setCurrentArticle(article);
        } else {
          setCurrentArticle(null);
        }
      } catch (error) {
        console.error("Error loading article:", error);
        setCurrentArticle(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadArticle();
  }, [slug, refreshCounter]);

  const handleCommentAdded = () => {
    setRefreshCounter(prev => prev + 1);
  };
  
  const handleGoBack = () => {
    navigate("/");
  };
  
  if (loading) {
    return <ArticleLoading />;
  }

  if (!currentArticle) {
    return <ArticleNotFound onGoBack={handleGoBack} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16">
        <ArticlePageContent 
          article={currentArticle}
          rawCategoryValue={rawCategoryValue}
          onGoBack={handleGoBack}
          onCommentAdded={handleCommentAdded}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlePage;
