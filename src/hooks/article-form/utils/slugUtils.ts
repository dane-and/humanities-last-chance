
/**
 * Helper function to generate slug from title
 * @param title The article title to convert to a slug
 */
export const generateSlug = (title: string): string => {
  if (!title || typeof title !== 'string') return '';
  
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single one
    .trim()
    .replace(/^-|-$/g, ''); // Remove leading and trailing hyphens
};

/**
 * Check if a slug is valid
 * @param slug The slug to validate
 */
export const isValidSlug = (slug: string): boolean => {
  if (!slug || typeof slug !== 'string') return false;
  
  // A valid slug should:
  // - Contain only lowercase letters, numbers, and hyphens
  // - Not start or end with a hyphen
  // - Not contain consecutive hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
};
