
import React from 'react';
import LocalBackupSection from './LocalBackupSection';
import CloudBackupSection from './CloudBackupSection';
import BackupAlerts from './BackupAlerts';

interface BackupRestoreTabProps {
  daysSinceBackup: number | null;
  setDaysSinceBackup: (days: number) => void;
  onDataImported: () => void;
}

const BackupRestoreTab: React.FC<BackupRestoreTabProps> = ({ 
  daysSinceBackup, 
  setDaysSinceBackup, 
  onDataImported 
}) => {
  return (
    <div className="space-y-4">
      <BackupAlerts daysSinceBackup={daysSinceBackup} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LocalBackupSection 
          setDaysSinceBackup={setDaysSinceBackup} 
          onDataImported={onDataImported} 
        />
        <CloudBackupSection 
          setDaysSinceBackup={setDaysSinceBackup} 
        />
      </div>
    </div>
  );
};

export default BackupRestoreTab;
