
import React from 'react';

interface DebugInfoProps {
  rawCategoryValue: any;
  category: string;
}

const DebugInfo: React.FC<DebugInfoProps> = ({ rawCategoryValue, category }) => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded text-xs">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <p><strong>Raw category value:</strong> {JSON.stringify(rawCategoryValue)}</p>
      <p><strong>Normalized category:</strong> {category}</p>
      <p><strong>Category type:</strong> {typeof category}</p>
    </div>
  );
};

export default DebugInfo;
