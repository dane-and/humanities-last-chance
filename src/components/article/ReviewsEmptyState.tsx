
import React from 'react';

interface ReviewsEmptyStateProps {
  error: string | null;
}

const ReviewsEmptyState: React.FC<ReviewsEmptyStateProps> = ({ error }) => {
  return (
    <div className="text-center py-12">
      <p className="text-xl text-muted-foreground">No reviews available yet.</p>
      <p className="text-muted-foreground mt-2">
        {error || "Check that you have published reviews in Sanity Studio with category set to \"review\"."}
      </p>
    </div>
  );
};

export default ReviewsEmptyState;
