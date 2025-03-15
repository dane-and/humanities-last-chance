
// This file is kept for backward compatibility, all functions are now in separate files
// Re-export all storage functions from the new modular structure
export * from './storage';

// Import functions from the storage module explicitly for better tree-shaking
import { 
  getArticlesFromStorage, 
  saveArticlesToStorage 
} from './storage/articleStorage';

import {
  addCommentToArticle,
  removeCommentFromArticle,
  updateCommentVote
} from './storage/commentStorage';

import {
  exportArticlesData,
  importArticlesData
} from './storage/dataExportImport';

// Re-export all functions explicitly
export {
  getArticlesFromStorage,
  saveArticlesToStorage,
  addCommentToArticle,
  removeCommentFromArticle,
  updateCommentVote,
  exportArticlesData,
  importArticlesData
};
