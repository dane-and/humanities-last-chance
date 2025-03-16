
import React from 'react';
import { 
  Alert, 
  AlertDescription,
  AlertTitle 
} from "@/components/ui/alert";
import { Info, Calendar } from 'lucide-react';

interface BackupAlertsProps {
  daysSinceBackup: number | null;
}

const BackupAlerts: React.FC<BackupAlertsProps> = ({ daysSinceBackup }) => {
  return (
    <>
      {daysSinceBackup !== null && daysSinceBackup > 7 && (
        <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200 mb-4">
          <Calendar className="h-4 w-4" />
          <AlertTitle>Backup Reminder</AlertTitle>
          <AlertDescription>
            It's been {daysSinceBackup} days since your last backup. Consider exporting your data now.
          </AlertDescription>
        </Alert>
      )}
      
      <Alert className="mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          This website uses browser storage to save your articles. Export your data regularly to avoid data loss when changing browsers or devices.
        </AlertDescription>
      </Alert>
    </>
  );
};

export default BackupAlerts;
