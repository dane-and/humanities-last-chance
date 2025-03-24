
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
import { MessageCircle } from 'lucide-react';

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
      try {
        const sanityPost = await fetchArticleBySlug(slug);
        if (sanityPost) {
          const article: Article = {
            id: sanityPost._id || `sanity-${Date.now()}`,
            title: sanityPost.title || "Untitled Post",
            slug: sanityPost.slug?.current || slug,
            date: sanityPost.publishedAt
              ? new Date(sanityPost.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : new Date().toLocaleDateString(),
            category: typeof sanityPost.category === 'string' ? sanityPost.category : 'Uncategorized',
            image: sanityPost.mainImage?.asset?.url || '',
            imageCaption: sanityPost.mainImage?.caption || '',
            excerpt: sanityPost.excerpt || '',
            content: sanityPost.body || '',
            tags: Array.isArray(sanityPost.tags) ? sanityPost.tags : [],
            comments: Array.isArray(sanityPost.comments) ? sanityPost.comments : [],
          };
          setCurrentArticle(article);
          console.log("Article loaded:", article);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <ArticleLoading />
          ) : currentArticle === null ? (
            <ArticleNotFound />
          ) : (
            <>
              <ArticleHeader article={currentArticle} onGoBack={() => navigate('/')} />
              <ArticleImage article={currentArticle} />
              <div className="mt-8 mb-12">
                <ArticleContent content={currentArticle.content} />
              </div>
              <ArticleTags tags={currentArticle.tags} />
              <div className="flex items-center mt-8 mb-4">
                <MessageCircle className="w-5 h-5 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {currentArticle.comments?.length || 0} comments
                </span>
              </div>
              <ArticleComments
                articleId={currentArticle.id}
                comments={currentArticle.comments}
                onCommentAdded={() => setRefreshCounter((count) => count + 1)}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
