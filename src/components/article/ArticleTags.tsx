
import React from 'react';

interface ArticleTagsProps {
  tags: string[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-4 pt-2 border-t">
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <a
            key={tag}
            href={`/tag/${tag.toLowerCase()}`}
            className="bg-secondary px-3 py-1 rounded-full text-sm hover:bg-secondary/80 transition-colors"
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArticleTags;
