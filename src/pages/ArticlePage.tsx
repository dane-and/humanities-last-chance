
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
import { Link } from 'react-router-dom';

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
          // Debug category type and value
          console.log(`Article category from Sanity (type ${typeof sanityPost.category}):`, sanityPost.category);
          
          // Apply type checking for category - handle all possible formats
          let categoryValue: Article['category'] = 'Blog'; // Default fallback
          
          if (typeof sanityPost.category === 'string') {
            // Direct string assignment - normalize to our expected values
            const catLower = sanityPost.category.toLowerCase();
            if (catLower === 'blog' || catLower === 'blogs') {
              categoryValue = 'Blog';
            } else if (catLower === 'interview' || catLower === 'interviews') {
              categoryValue = 'Interview';
            } else if (catLower === 'review' || catLower === 'reviews') {
              categoryValue = 'Review';
            } else if (catLower === 'resource' || catLower === 'resources') {
              categoryValue = 'Resource';
            }
          } else if (Array.isArray(sanityPost.category) && sanityPost.category.length > 0) {
            // Handle array format
            if (typeof sanityPost.category[0] === 'string') {
              const catLower = sanityPost.category[0].toLowerCase();
              if (catLower === 'blog' || catLower === 'blogs') {
                categoryValue = 'Blog';
              } else if (catLower === 'interview' || catLower === 'interviews') {
                categoryValue = 'Interview';
              } else if (catLower === 'review' || catLower === 'reviews') {
                categoryValue = 'Review';
              } else if (catLower === 'resource' || catLower === 'resources') {
                categoryValue = 'Resource';
              }
            }
          } else if (sanityPost.category && typeof sanityPost.category === 'object') {
            // Handle object format with potential name or title property
            const objCat = sanityPost.category;
            if (typeof objCat.name === 'string') {
              const catLower = objCat.name.toLowerCase();
              if (catLower === 'blog' || catLower === 'blogs') {
                categoryValue = 'Blog';
              } else if (catLower === 'interview' || catLower === 'interviews') {
                categoryValue = 'Interview';
              } else if (catLower === 'review' || catLower === 'reviews') {
                categoryValue = 'Review';
              } else if (catLower === 'resource' || catLower === 'resources') {
                categoryValue = 'Resource';
              }
            } else if (typeof objCat.title === 'string') {
              const catLower = objCat.title.toLowerCase();
              if (catLower === 'blog' || catLower === 'blogs') {
                categoryValue = 'Blog';
              } else if (catLower === 'interview' || catLower === 'interviews') {
                categoryValue = 'Interview';
              } else if (catLower === 'review' || catLower === 'reviews') {
                categoryValue = 'Review';
              } else if (catLower === 'resource' || catLower === 'resources') {
                categoryValue = 'Resource';
              }
            }
          }
          
          console.log("Using safe category value:", categoryValue);
          
          // Debug the tags
          console.log(`Article tags from Sanity:`, sanityPost.tags);
          
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
            publishedAt: sanityPost.publishedAt || sanityPost._createdAt || new Date().toISOString(),
            category: categoryValue, // Use the safely processed category value
            image: sanityPost.mainImage?.asset?.url || '',
            imageCaption: sanityPost.mainImage?.caption || '',
            excerpt: sanityPost.excerpt || '',
            content: sanityPost.body || '',
            tags: sanityPost.tags || [],
            comments: sanityPost.comments || [],
          };
          
          console.log("Formatted article with category:", article.category);
          console.log("Formatted article with tags:", article.tags);
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

  const commentCount = currentArticle.comments?.length || 0;

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
          
          {/* Only display tags if they exist */}
          {currentArticle.tags && currentArticle.tags.length > 0 && (
            <ArticleTags tags={currentArticle.tags} />
          )}
          
          {/* Comments link at the bottom of article content */}
          <div className="mb-4 mt-8">
            <Link 
              to="#comments" 
              className="text-muted-foreground hover:text-primary text-sm inline-flex items-center transition-colors"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
            </Link>
          </div>
          
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
