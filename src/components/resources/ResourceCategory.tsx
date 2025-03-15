
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import ResourceItem from './ResourceItem';
import { ResourceCategory as ResourceCategoryType } from './types';

interface ResourceCategoryProps {
  category: ResourceCategoryType;
}

const ResourceCategory: React.FC<ResourceCategoryProps> = ({ category }) => {
  return (
    <AccordionItem key={category.id} value={category.id}>
      <AccordionTrigger className="text-lg font-medium">
        {category.name}
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-4 pt-2">
          {category.resources.map((resource, index) => (
            <ResourceItem key={index} resource={resource} />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ResourceCategory;
