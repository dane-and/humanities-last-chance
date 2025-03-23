
import React from 'react';

interface ReviewsDebugInfoProps {
  allPosts: any[];
  articles: any[];
  error: string | null;
}

const ReviewsDebugInfo: React.FC<ReviewsDebugInfoProps> = ({ 
  allPosts, 
  articles, 
  error 
}) => {
  // Only render in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="bg-gray-100 p-4 rounded mb-8">
      <h2 className="text-lg font-bold mb-2">Debugging Information:</h2>
      <p>Total posts loaded: {allPosts.length}</p>
      <p>Filtered review posts: {articles.length}</p>
      {error && <p className="text-red-500 font-bold">Error: {error}</p>}
      
      <div className="mt-2">
        <h3 className="font-bold">All posts categories:</h3>
        <ul className="list-disc pl-8">
          {allPosts.length > 0 ? (
            allPosts.map((post, index) => (
              <li key={index}>
                "{post.title}" - category: "{post.category || 'undefined'}" - 
                slug: {post.slug?.current || 'undefined'}
              </li>
            ))
          ) : (
            <li className="text-red-500">No posts loaded from Sanity</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ReviewsDebugInfo;
