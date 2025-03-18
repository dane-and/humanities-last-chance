
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArticleComments from '@/components/ArticleComments';
import { Article } from '@/lib/types/article';
import { fetchArticleBySlug } from '@/lib/sanity';
import ArticleLoading from '@/components/article/ArticleLoading';
import ArticleNotFound from '@/components/article/ArticleNotFound';
import ArticleHeader from '@/components/article/ArticleHeader';
import ArticleImage from '@/components/article/ArticleImage';
import ArticleContent from '@/components/article/ArticleContent';
import ArticleTags from '@/components/article/ArticleTags';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      setLoading(true);
      console.log(`Loading article with slug: ${slug} from Sanity`);
      
      try {
        const sanityPost = await fetchArticleBySlug(slug);
        console.log("Fetched article from Sanity:", sanityPost);
        
        if (sanityPost) {
          // Log the exact category we get from Sanity
          console.log(`Article category from Sanity: "${sanityPost.category}"`);
          
          // Convert Sanity post to Article format
          const article: Article = {
            id: sanityPost._id || `sanity-${Date.now()}`,
            title: sanityPost.title || "Untitled Post",
            slug: sanityPost.slug?.current || slug,
            date: sanityPost.publishedAt ? new Date(sanityPost.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : new Date().toLocaleDateString(),
            category: sanityPost.category || 'Blog', // Preserve the exact case
            image: sanityPost.mainImage?.asset?.url || '',
            imageCaption: sanityPost.mainImage?.caption || '',
            excerpt: sanityPost.excerpt || '',
            content: sanityPost.body || '',
            tags: sanityPost.tags || [],
            comments: sanityPost.comments || [],
          };
          
          console.log("Formatted article with category:", article.category);
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleHeader 
            article={currentArticle} 
            onGoBack={handleGoBack} 
          />
          
          <ArticleImage
            image={currentArticle.image}
            title={currentArticle.title}
            imageCaption={currentArticle.imageCaption}
          />
          
          <ArticleContent content={currentArticle.content} />
          
          <ArticleTags tags={currentArticle.tags || []} />
          
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
