
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion.jsx';
import ResourceItem from './ResourceItem';
import PropTypes from 'prop-types';

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
