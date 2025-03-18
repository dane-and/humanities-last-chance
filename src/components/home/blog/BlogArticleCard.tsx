
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import TagList from '@/components/TagList';
import OptimizedImage from '@/components/OptimizedImage';
import { Article } from '@/lib/types/article';

interface BlogArticleCardProps {
  post: Article;
  index: number;
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({ post, index }) => {
  return (
    <article 
      className="prose prose-lg max-w-none fade-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <h2 className="font-serif text-xl md:text-2xl font-bold mb-2">
        <Link 
          to={`/article/${post.slug}`} 
          className="hover:text-primary transition-colors no-underline"
          aria-label={`Read article: ${post.title}`}
        >
          {post.title}
        </Link>
      </h2>
      
      <div className="block text-sm text-muted-foreground mb-2">
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
      
      {/* Add article image if available */}
      {post.image && post.image.trim() !== '' && (
        <div className="mb-4">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            className="w-full rounded-md"
            caption={post.imageCaption}
            width={1200}
            height={800}
          />
        </div>
      )}
      
      <div 
        className="text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {post.tags && post.tags.length > 0 && (
        <div className="mt-2">
          <TagList tags={post.tags} />
        </div>
      )}
    </article>
  );
};

export default BlogArticleCard;
