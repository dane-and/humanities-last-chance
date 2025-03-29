
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { sanityClient, PortableText } from '@/lib/sanity';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Article } from '@/lib/types/article';
import ArticleHeader from '@/components/article/ArticleHeader';
import ArticleContent from '@/components/article/ArticleContent';
import ArticleNotFound from '@/components/article/ArticleNotFound';
import ArticleLoading from '@/components/article/ArticleLoading';

interface ArticlePageProps {
  article: Article | null;
}

export default function ArticlePage({ article }: ArticlePageProps) {
  const router = useRouter();
  const [refreshCounter, setRefreshCounter] = useState(0);
  
  // This will be true during initial static generation or when fallback is true
  const isLoading = router.isFallback;
  
  // Define the onGoBack function to navigate back
  const handleGoBack = () => router.push('/');
  
  // Get base URL for canonical URLs and image URLs
  const baseUrl = 'https://humanitieslastchance.org';
  const canonicalUrl = `${baseUrl}/articles/${article?.slug || ''}`;
  
  // If the page is still being generated, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArticleLoading />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If article is not found, show 404 error
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArticleNotFound onGoBack={handleGoBack} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{article.title} | Humanities Last Chance</title>
        <meta name="description" content={article.excerpt} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        {article.image && <meta property="og:image" content={article.image} />}
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        {article.image && <meta name="twitter:image" content={article.image} />}
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Navigation />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleHeader article={article} onGoBack={handleGoBack} />
          
          {article.image && (
            <div className="w-full flex justify-center my-6">
              <div className="max-w-2xl w-full bg-white rounded-md overflow-hidden shadow-sm">
                <div className="relative w-full" style={{ height: '450px' }}>
                  <Image 
                    src={article.image}
                    alt={article.imageCaption || article.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 800px"
                    style={{ objectFit: 'contain' }}
                    className="mx-auto"
                  />
                </div>
                {article.imageCaption && (
                  <figcaption className="text-center text-sm text-muted-foreground p-2 italic">
                    {article.imageCaption}
                  </figcaption>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-8 mb-12">
            <ArticleContent content={article.content} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all article slugs from Sanity
  const slugs = await sanityClient.fetch(`
    *[_type == "post"].slug.current
  `);
  
  // Create paths for each article
  const paths = slugs.map((slug: string) => ({
    params: { slug },
  }));
  
  return {
    paths,
    // We'll use a fallback so any article not built at build time will be 
    // generated when requested
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  if (!slug) {
    return {
      notFound: true,
    };
  }
  
  try {
    // Fetch the article from Sanity
    const sanityPost = await sanityClient.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        mainImage{
          asset->{url, _id},
          hotspot,
          caption,
          alt
        },
        body,
        publishedAt,
        _createdAt,
        _updatedAt,
        category,
        tags,
        excerpt,
        comments
      }
    `, { slug });
    
    if (!sanityPost) {
      return {
        notFound: true,
      };
    }
    
    // Process tags - ensure they're correctly formatted from Sanity
    const processedTags = Array.isArray(sanityPost.tags) 
      ? sanityPost.tags.map((tag: any) => {
          if (typeof tag === 'object' && tag !== null && tag.label) {
            return tag.label;
          }
          return tag;
        }).filter((tag: any) => tag !== null && tag !== undefined)
      : [];
    
    // Convert Sanity post to Article format
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
      tags: processedTags,
      comments: Array.isArray(sanityPost.comments) ? sanityPost.comments : [],
    };
    
    return {
      props: {
        article,
      },
      // Enable ISR with a revalidation period of 60 seconds
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    
    return {
      props: {
        article: null,
      },
      // Even on error, revalidate after 60 seconds
      revalidate: 60,
    };
  }
};
