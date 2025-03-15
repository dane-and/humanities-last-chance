
import React from 'react';

interface FeaturedToggleProps {
  featured: boolean;
  onFeaturedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FeaturedToggle: React.FC<FeaturedToggleProps> = ({
  featured,
  onFeaturedChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="featured"
        name="featured"
        checked={featured}
        onChange={onFeaturedChange}
        className="rounded border-gray-300"
      />
      <label htmlFor="featured" className="text-sm font-medium">
        Featured Article
      </label>
    </div>
  );
};

export default FeaturedToggle;
