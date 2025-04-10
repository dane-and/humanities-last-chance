// src/utils/index.ts

// A utility function for combining class names conditionally
export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
