
import React from 'react';
import TagList from '@/components/TagList';

interface ArticleTagsProps {
  tags: (string | null | undefined)[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tags }) => {
  // Filter out null and undefined values using type predicate
  const nonNullTags = tags.filter((tag): tag is string => 
    tag !== null && tag !== undefined && typeof tag === 'string' && tag.trim() !== ''
  );

  console.log("ArticleTags rendering with tags:", nonNullTags);

  if (nonNullTags.length === 0) return null;

  return (
    <div className="mt-6 pt-4 border-t">
      <h3 className="text-base font-medium mb-3">Tags</h3>
      <div className="flex flex-wrap gap-2">
        <TagList tags={nonNullTags} compact={false} />
      </div>
    </div>
  );
};

export default ArticleTags;
