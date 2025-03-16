
/**
 * Schedule automatic backup to run after a specified interval
 */
export const scheduleAutomaticBackup = (intervalDays: number = 7): void => {
  // We can't actually schedule in localStorage, but we can set a reminder
  // This would be implemented with a cloud service in a full solution
  const BACKUP_SCHEDULE_KEY = 'hlc-backup-schedule';
  
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(BACKUP_SCHEDULE_KEY, JSON.stringify({
      intervalDays,
      nextBackupDate: new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000).toISOString()
    }));
  }
};
