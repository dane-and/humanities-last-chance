
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import TagList from '@/components/TagList';
import { Article } from '@/lib/types/article';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PortableText } from '@/lib/sanity';
import OptimizedImage from '@/components/OptimizedImage';
import { Separator } from '@/components/ui/separator';

interface BlogArticleCardProps {
  post: Article;
  index: number;
  fullContent?: boolean;
  isLastItem?: boolean;
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({ 
  post, 
  index, 
  fullContent = false, 
  isLastItem = false 
}) => {
  // For debugging - log the category exactly as it comes from the data
  console.log(`BlogArticleCard: Rendering post "${post.title}" with category "${post.category}"`);
  
  const commentCount = post.comments?.length || 0;
  
  return (
    <>
      <article 
        className={`prose prose-lg max-w-none fade-up bg-background transition-all duration-300 pb-8 ${fullContent ? '' : 'hover:shadow-sm'}`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <h2 className={`font-serif text-xl md:text-2xl font-bold mb-2`}>
          {fullContent ? (
            post.title
          ) : (
            <Link 
              to={`/article/${post.slug}`} 
              className="hover:text-primary transition-colors no-underline"
              aria-label={`Read article: ${post.title}`}
            >
              {post.title}
            </Link>
          )}
        </h2>
        
        <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4 gap-x-1 gap-y-2">
          <span className="inline-block">{post.date}</span>
          <span className="inline-block mx-1" aria-hidden="true">•</span>
          <Link 
            to={`/articles/${post.category}`}
            className="inline-block hover:text-primary"
          >
            {post.category}
          </Link>
        </div>
        
        {/* Always show the image if available */}
        {post.image && post.image.trim() !== '' && (
          <div className="mb-3 overflow-hidden rounded-md">
            <AspectRatio ratio={16/9}>
              {fullContent ? (
                <OptimizedImage
                  src={post.image}
                  alt={post.title}
                  className="transition-transform duration-500 object-cover"
                  width={1200}
                  height={675}
                  priority={index < 2}
                />
              ) : (
                <Link to={`/article/${post.slug}`} className="block w-full h-full">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    className="transition-transform duration-500 hover:scale-105 object-cover"
                    width={1200}
                    height={675}
                    priority={index < 2}
                  />
                </Link>
              )}
            </AspectRatio>
          </div>
        )}
        
        <div className={`text-muted-foreground prose-p:text-base prose-p:md:text-lg prose-p:leading-relaxed ${fullContent ? '' : 'line-clamp-3'} mb-3`}>
          {typeof post.content === 'object' ? (
            <PortableText value={post.content} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          )}
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="mb-3">
            <TagList tags={post.tags} />
          </div>
        )}
        
        {!fullContent && (
          <div className="flex items-center justify-between mb-2">
            <Link 
              to={`/article/${post.slug}#comments`}
              className="text-muted-foreground hover:text-primary text-sm inline-flex items-center transition-colors"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
            </Link>
            
            <Link 
              to={`/article/${post.slug}`}
              className="inline-block px-4 py-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10 transition-colors"
              aria-label={`Continue reading ${post.title}`}
            >
              Read more
            </Link>
          </div>
        )}
      </article>
      
      {!isLastItem && (
        <Separator className="mb-8" />
      )}
    </>
  );
};

export default BlogArticleCard;
