// ...imports remain unchanged...

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
              <ArticleContent article={currentArticle} />
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

