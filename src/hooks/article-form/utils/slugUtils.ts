
/**
 * Utility functions for generating and managing slugs
 */

// Function to generate a slug from a title
export const generateSlug = (title: string): string => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with a single hyphen
    .trim();                  // Remove trailing spaces/hyphens
};

// Export generateSlugFromTitle as an alias for generateSlug for backward compatibility
export const generateSlugFromTitle = generateSlug;
