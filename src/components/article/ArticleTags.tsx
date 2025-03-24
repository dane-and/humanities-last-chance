
import React from 'react';
import TagList from '@/components/TagList';

interface ArticleTagsProps {
  tags: string[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tags }) => {
  // Normalize tags that might come from Sanity in different formats
  const normalizedTags = Array.isArray(tags) 
    ? tags.map(tag => {
        if (typeof tag === 'object' && tag !== null && 'label' in tag) {
          return tag.label;
        }
        return tag;
      })
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
