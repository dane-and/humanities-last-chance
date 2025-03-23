
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Article } from '@/lib/types/article';
import ArticleHeader from './ArticleHeader';
import ArticleImage from './ArticleImage';
import ArticleContent from './ArticleContent';
import ArticleTags from './ArticleTags';
import ArticleComments from '@/components/ArticleComments';
import DebugInfo from './DebugInfo';

interface ArticlePageContentProps {
  article: Article;
  rawCategoryValue: any;
  onGoBack: () => void;
  onCommentAdded: () => void;
}

const ArticlePageContent: React.FC<ArticlePageContentProps> = ({ 
  article, 
  rawCategoryValue, 
  onGoBack, 
  onCommentAdded 
}) => {
  const commentCount = article.comments?.length || 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Debug info */}
      <DebugInfo 
        rawCategoryValue={rawCategoryValue} 
        category={article.category} 
      />
      
      <ArticleHeader 
        article={article} 
        onGoBack={onGoBack} 
      />
      
      <ArticleImage
        image={article.image}
        title={article.title}
        imageCaption={article.imageCaption}
      />
      
      <ArticleContent content={article.content} />
      
      {/* Only display tags if they exist */}
      {article.tags && article.tags.length > 0 && (
        <ArticleTags tags={article.tags} />
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
        articleId={article.id} 
        comments={article.comments || []}
        onCommentAdded={onCommentAdded}
      />
    </div>
  );
};

export default ArticlePageContent;
