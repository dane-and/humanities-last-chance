
import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import ResourceCategory from './ResourceCategory';
import { resourceCategories } from './categories';

const OtherResources: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="prose max-w-none mb-8">
        <h2 className="text-2xl font-serif">Other Resources</h2>
        <p>
          A curated collection of online resources valuable for humanities scholars,
          researchers, and enthusiasts. These websites offer free and accessible content
          spanning various media formats and disciplines.
        </p>
      </div>
      
      <Accordion type="multiple" className="w-full">
        {resourceCategories.map((category) => (
          <ResourceCategory key={category.id} category={category} />
        ))}
      </Accordion>
    </div>
  );
};

export default OtherResources;
