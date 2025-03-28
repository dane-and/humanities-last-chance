
import React from 'react';
import TagList from '@/components/TagList';

interface ArticleTagsProps {
  tags: string[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tags }) => {
  // Temporarily disabled - return null to hide tags
  return null;

  /* Original implementation kept for future reference
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mt-4 pt-2 border-t">
      <div className="flex flex-wrap gap-2">
        <TagList tags={tags} compact={false} />
      </div>
    </div>
  );
  */
};

export default ArticleTags;
