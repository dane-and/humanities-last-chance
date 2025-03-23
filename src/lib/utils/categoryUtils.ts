
/**
 * Safely extracts a category string from various possible formats
 * @param rawCategory - The category field which could be string, object, array, etc.
 * @returns A safe string representation of the category
 */
export const getSafeCategoryString = (rawCategory: any): string => {
  // Log the incoming value for debugging
  console.log("getSafeCategoryString - Input:", {
    type: typeof rawCategory,
    value: rawCategory,
    isNull: rawCategory === null,
    isUndefined: rawCategory === undefined
  });
  
  // If null or undefined, return default
  if (rawCategory === null || rawCategory === undefined) {
    console.warn("Category is null or undefined, using default 'Blog'");
    return 'Blog';
  }
  
  // If it's already a string
  if (typeof rawCategory === 'string') {
    return rawCategory;
  }
  
  // If it's an array, take the first string element
  if (Array.isArray(rawCategory) && rawCategory.length > 0) {
    console.log("Category is an array:", rawCategory);
    if (typeof rawCategory[0] === 'string') {
      return rawCategory[0];
    }
    // Try to extract from first object if it's not a string
    if (typeof rawCategory[0] === 'object' && rawCategory[0] !== null) {
      if (typeof rawCategory[0].name === 'string') {
        return rawCategory[0].name;
      }
      if (typeof rawCategory[0].title === 'string') {
        return rawCategory[0].title;
      }
    }
  }
  
  // If it's an object with a name, title, or value property
  if (rawCategory && typeof rawCategory === 'object') {
    console.log("Category is an object with keys:", Object.keys(rawCategory));
    
    if (typeof rawCategory.name === 'string') {
      return rawCategory.name;
    }
    if (typeof rawCategory.title === 'string') {
      return rawCategory.title;
    }
    if (typeof rawCategory.value === 'string') {
      return rawCategory.value;
    }
    // Special case for Sanity references
    if (rawCategory._ref && typeof rawCategory._ref === 'string') {
      console.warn("Found Sanity reference. This should be expanded in the query:", rawCategory);
      return 'Blog';  // Default if we have a reference that wasn't expanded
    }
  }
  
  // Default fallback
  console.warn("Could not extract category string, using default 'Blog'");
  return 'Blog';
};

/**
 * Safely gets a normalized lowercase category for comparisons
 * @param rawCategory - The category field which could be string, object, array, etc.
 * @returns Lowercase string for safe comparisons, empty string if invalid
 */
export const getSafeLowerCaseCategory = (rawCategory: any): string => {
  const categoryString = getSafeCategoryString(rawCategory);
  return categoryString ? categoryString.toLowerCase() : '';
};

/**
 * Gets a normalized category value that matches our defined Article types
 * @param rawCategory - The category field from a post/article
 * @returns A normalized category string that matches our Article type
 */
export const getNormalizedCategory = (rawCategory: any): 'Blog' | 'Interview' | 'Review' | 'Resource' => {
  const safeCategory = getSafeCategoryString(rawCategory);
  const lowerCaseCategory = safeCategory.toLowerCase();
  
  // Handle various forms (singular/plural)
  if (lowerCaseCategory === 'blog' || lowerCaseCategory === 'blogs') {
    return 'Blog';
  }
  if (lowerCaseCategory === 'interview' || lowerCaseCategory === 'interviews') {
    return 'Interview';
  }
  if (lowerCaseCategory === 'review' || lowerCaseCategory === 'reviews') {
    return 'Review';
  }
  if (lowerCaseCategory === 'resource' || lowerCaseCategory === 'resources') {
    return 'Resource';
  }
  
  // Default
  return 'Blog';
};
