
import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TagListProps {
  tags: string[];
  className?: string;
  compact?: boolean;
}

const TagList: React.FC<TagListProps> = ({ tags, className, compact = false }) => {
  // If no tags, don't render anything
  if (!tags || tags.length === 0) return null;
  
  // Filter out any empty or malformed tags and normalize
  const normalizedTags = tags
    .filter(Boolean) // Remove null and undefined values
    .map(tag => {
      // Handle objects with label property
      if (typeof tag === 'object' && tag !== null && 'label' in tag) {
        return (tag as {label: string}).label;
      }
      // Convert to string (non-null at this point due to filter(Boolean))
      return String(tag);
    })
    .filter(tag => tag.trim() !== '');

  if (normalizedTags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {compact ? (
        <div className="flex items-center text-xs text-muted-foreground">
          <Tag className="h-3 w-3 mr-1" />
          {normalizedTags.map((tag, index) => (
            <React.Fragment key={tag || index}>
              <Link
                to={`/tag/${encodeURIComponent(tag.toLowerCase())}`}
                className="hover:text-primary transition-colors"
              >
                {tag}
              </Link>
              {index < normalizedTags.length - 1 && <span className="mx-1">•</span>}
            </React.Fragment>
          ))}
        </div>
      ) : (
        normalizedTags.map((tag, index) => (
          <Link
            key={tag || index}
            to={`/tag/${encodeURIComponent(tag.toLowerCase())}`}
          >
            <Badge
              variant="outline"
              className="bg-white text-blue-500 hover:bg-gray-100 border border-gray-200 transition-colors"
            >
              {tag}
            </Badge>
          </Link>
        ))
      )}
    </div>
  );
};

export default TagList;
