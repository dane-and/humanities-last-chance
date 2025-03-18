
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import TagList from '@/components/TagList';
import { Article } from '@/lib/types/article';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PortableText } from '@/lib/sanity';
import OptimizedImage from '@/components/OptimizedImage';

interface BlogArticleCardProps {
  post: Article;
  index: number;
  fullContent?: boolean;
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({ post, index, fullContent = false }) => {
  return (
    <article 
      className={`prose prose-lg max-w-none fade-up bg-background rounded-lg transition-all duration-300 ${fullContent ? '' : 'hover:shadow-md'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <h2 className="font-serif text-xl md:text-2xl font-bold mb-2">
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
          to={`/articles/${post.category.toLowerCase()}`}
          className="inline-block hover:text-primary"
        >
          {post.category}
        </Link>
        {post.comments && post.comments.length > 0 && (
          <>
            <span className="inline-block mx-1" aria-hidden="true">•</span>
            <Link 
              to={`/article/${post.slug}`}
              className="inline-flex items-center hover:text-primary"
              aria-label={`${post.comments.length} comment${post.comments.length !== 1 ? 's' : ''}`}
            >
              <MessageCircle className="h-4 w-4 mr-1" aria-hidden="true" />
              {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
            </Link>
          </>
        )}
      </div>
      
      {/* Always show the image if available */}
      {post.image && post.image.trim() !== '' && (
        <div className="mb-3 overflow-hidden rounded-md">
          <AspectRatio ratio={16/9} className="bg-muted">
            {fullContent ? (
              <OptimizedImage
                src={post.image}
                alt={post.title}
                className="transition-transform duration-500"
                width={1200}
                height={675}
                priority={index < 2}
              />
            ) : (
              <Link to={`/article/${post.slug}`} className="block w-full h-full">
                <OptimizedImage
                  src={post.image}
                  alt={post.title}
                  className="transition-transform duration-500 hover:scale-105"
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
        <div className="mb-2">
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
  );
};

export default BlogArticleCard;
