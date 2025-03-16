
import { LAST_BACKUP_KEY, BACKUP_REMINDER_DAYS, getFromLocalStorage } from './articleStorageBase';

/**
 * Records when a backup was performed
 */
export const recordBackupPerformed = () => {
  localStorage.setItem(LAST_BACKUP_KEY, new Date().toISOString());
};

/**
 * Checks if it's time to remind the user to create a backup
 */
export const checkBackupReminder = (): boolean => {
  const lastBackup = localStorage.getItem(LAST_BACKUP_KEY);
  
  if (!lastBackup) {
    return true; // No backup ever recorded
  }
  
  const lastBackupDate = new Date(lastBackup);
  const currentDate = new Date();
  
  // Calculate days since last backup
  const daysSinceBackup = Math.floor(
    (currentDate.getTime() - lastBackupDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  return daysSinceBackup >= BACKUP_REMINDER_DAYS;
};

/**
 * Gets days since the last backup was performed
 */
export const getDaysSinceLastBackup = (): number | null => {
  const lastBackup = localStorage.getItem(LAST_BACKUP_KEY);
  
  if (!lastBackup) {
    return null; // No backup ever recorded
  }
  
  const lastBackupDate = new Date(lastBackup);
  const currentDate = new Date();
  
  // Calculate days since last backup
  return Math.floor(
    (currentDate.getTime() - lastBackupDate.getTime()) / (1000 * 60 * 60 * 24)
  );
};
