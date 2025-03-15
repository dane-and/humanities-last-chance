
// Re-export all image editing utilities for easy imports
export * from './imageCache';
export * from './imageLoading';
export * from './cropUtils';
export * from './constants';
export * from './useCanvas';
export * from './useTransformations';
export * from './useCrop';

// Export convenience functions from the old imageEditUtils.ts file
export const getCanvasImageData = (canvas: any, format: string = 'png', quality: number = 0.9): string => {
  if (!canvas) return '';
  return canvas.toDataURL({
    format: format,
    quality: quality
  });
};
