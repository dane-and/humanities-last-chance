
import React from 'react';
import TagList from '@/components/TagList';

interface ArticleTagsProps {
  tags: string[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tags }) => {
  // Normalize tags that might come from Sanity in different formats
  const normalizedTags = Array.isArray(tags) 
    ? tags
        .filter((tag): tag is NonNullable<typeof tag> => tag != null) // Remove null and undefined values
        .map(tag => {
          // Handle objects with label property
          if (typeof tag === 'object' && tag !== null && 'label' in tag) {
            return (tag as {label: string}).label;
          }
          // At this point, tag won't be null due to filter above
          return String(tag as NonNullable<typeof tag>);
        })
        // Explicitly ensure we're only working with non-empty strings
        .filter((tag): tag is string => typeof tag === 'string' && tag.trim() !== '')
    : [];
  
  if (!normalizedTags || normalizedTags.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-4 pt-2 border-t">
      <h3 className="text-sm font-medium mb-2">Tags:</h3>
      <div className="flex flex-wrap gap-2">
        <TagList tags={normalizedTags} compact={false} />
      </div>
    </div>
  );
};

export default ArticleTags;

