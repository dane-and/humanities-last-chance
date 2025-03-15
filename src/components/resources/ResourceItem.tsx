
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Resource } from './types';

interface ResourceItemProps {
  resource: Resource;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ resource }) => {
  return (
    <div className="group bg-card rounded-lg p-4 border transition-colors hover:bg-muted/50">
      <div className="flex items-start space-x-3">
        {resource.icon}
        <div className="flex-1 space-y-1">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-lg font-medium text-primary hover:underline"
          >
            {resource.name}
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
          {resource.description && (
            <p className="text-sm text-muted-foreground">{resource.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceItem;
