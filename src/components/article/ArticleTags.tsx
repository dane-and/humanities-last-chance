
import React from 'react';
import TagList from '@/components/TagList';

interface ArticleTagsProps {
  tags: (string | null | undefined)[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tags }) => {
  // Filter out null and undefined values using type predicate
  const nonNullTags = tags.filter((tag): tag is string => 
    tag !== null && tag !== undefined && typeof tag === 'string'
  );

  if (nonNullTags.length === 0) return null;

  return (
    <div className="mt-4 pt-2 border-t">
      <div className="flex flex-wrap gap-2">
        <TagList tags={nonNullTags} compact={false} />
      </div>
    </div>
  );
};

export default ArticleTags;
