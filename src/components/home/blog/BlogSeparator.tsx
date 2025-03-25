
import React from 'react';

interface BlogSeparatorProps {
  showComments?: boolean;
  commentCount?: number;
  articleSlug?: string;
}

const BlogSeparator: React.FC<BlogSeparatorProps> = ({ 
  showComments = true, 
  commentCount = 0,
  articleSlug = ''
}) => {
  return (
    <div className="py-4 flex flex-col">
      {/* Comment links temporarily disabled */}
      {/* {showComments && (
        <div className="mb-2">
          <a 
            href={`/article/${articleSlug}#comments`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {commentCount > 0 ? `Comments (${commentCount})` : 'Add a comment'}
          </a>
        </div>
      )} */}
      <div className="w-full h-px bg-border/50"></div>
    </div>
  );
};

export default BlogSeparator;
