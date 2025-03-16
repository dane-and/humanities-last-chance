
// Base storage constants and utility functions
export const STORAGE_KEY = 'hlc-articles';
export const DRAFTS_KEY = 'hlc-drafts';
export const SCHEDULED_KEY = 'hlc-scheduled';
export const LAST_BACKUP_KEY = 'hlc-last-backup-date';
export const BACKUP_REMINDER_DAYS = 7; // Remind user to backup every 7 days

/**
 * Safely saves data to localStorage
 */
export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (e) {
    console.error(`Error saving to localStorage (${key}):`, e);
  }
};

/**
 * Safely reads data from localStorage
 */
export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedData = localStorage.getItem(key);
      return savedData ? JSON.parse(savedData) : defaultValue;
    }
    return defaultValue;
  } catch (e) {
    console.error(`Error reading from localStorage (${key}):`, e);
    return defaultValue;
  }
};
