
import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagListProps {
  tags: string[];
  className?: string;
  compact?: boolean;
}

const TagList: React.FC<TagListProps> = ({ tags, className, compact = false }) => {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {compact ? (
        <div className="flex items-center text-xs text-muted-foreground">
          <Tag className="h-3 w-3 mr-1" />
          {tags.map((tag, index) => (
            <React.Fragment key={tag}>
              <Link 
                to={`/tag/${encodeURIComponent(tag.toLowerCase())}`} 
                className="hover:text-primary transition-colors"
              >
                {tag}
              </Link>
              {index < tags.length - 1 && <span className="mx-1">•</span>}
            </React.Fragment>
          ))}
        </div>
      ) : (
        tags.map(tag => (
          <Link
            key={tag}
            to={`/tag/${encodeURIComponent(tag.toLowerCase())}`}
            className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs hover:bg-secondary/80 transition-colors"
          >
            {tag}
          </Link>
        ))
      )}
    </div>
  );
};

export default TagList;
