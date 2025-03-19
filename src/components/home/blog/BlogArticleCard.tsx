
import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '@/lib/types/article';
import { Card, CardContent } from '@/components/ui/card';
import ArticleContent from '@/components/article/ArticleContent';
import BlogSeparator from './BlogSeparator';

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
  // Get the comment count
  const commentCount = post.comments?.length || 0;
  
  console.log(`Rendering BlogArticleCard for post: ${post.title}, category: ${post.category}`);
  
  return (
    <div className={`mb-8 ${index > 0 ? 'mt-8' : ''}`}>
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <Link to={`/article/${post.slug}`}>
            <h2 className="text-2xl font-serif font-bold hover:text-primary transition-colors">
              {post.title}
            </h2>
          </Link>

          <div className="text-sm text-muted-foreground mt-1 mb-4">
            {post.date}
          </div>
          
          {!fullContent && post.excerpt ? (
            <p className="text-muted-foreground mb-2">
              {post.excerpt}
            </p>
          ) : (
            <div className="mb-4">
              <ArticleContent content={post.content} />
            </div>
          )}
          
          {!fullContent && !post.excerpt && (
            <div className="mb-4">
              <ArticleContent content={post.content} />
            </div>
          )}
          
          <BlogSeparator
            showComments={true}
            commentCount={commentCount}
            articleSlug={post.slug}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogArticleCard;
