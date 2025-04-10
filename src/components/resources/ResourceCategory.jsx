
import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import ResourceItem from './ResourceItem';

const ResourceCategory = ({ category }) => {
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

ResourceCategory.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    resources: PropTypes.array.isRequired
  }).isRequired
};

export default ResourceCategory;
