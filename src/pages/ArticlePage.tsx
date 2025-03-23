
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { sanityClient } from '@/lib/sanity/client';
import ArticleLoading from '@/components/article/ArticleLoading';
import ArticleNotFound from '@/components/article/ArticleNotFound';
import ArticlePageContent from '@/components/article/ArticlePageContent';
import { Article } from '@/lib/types/article';
import { mapSanityPostToArticle } from '@/lib/sanity/queries/posts/utils';
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
        // Use a direct GROQ query to get the article by slug
        const query = `*[_type == "post" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          mainImage{
            asset->{
              _id,
              url
            },
            caption
          },
          body,
          publishedAt,
          _createdAt,
          _updatedAt,
          category,
          tags,
          excerpt,
          comments
        }`;
        
        console.log("Executing Sanity query for article:", query);
        
        const post = await sanityClient.fetch(query, { slug });
        console.log("Fetched article from Sanity:", post);
        
        if (post) {
          // Store raw category value for debugging
          setRawCategoryValue(post.category);
          
          // Debug category type and value
          console.log(`Article category from Sanity:`, {
            type: typeof post.category,
            value: post.category
          });
          
          // Debug the tags
          console.log(`Article tags from Sanity:`, post.tags);
          
          // Map to our Article type
          const article = mapSanityPostToArticle(post);
          console.log("Mapped article:", {
            title: article.title,
            slug: article.slug,
            category: article.category
          });
          
          setCurrentArticle(article);
        } else {
          console.log(`No article found with slug: ${slug}`);
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
