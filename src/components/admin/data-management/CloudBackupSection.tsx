
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Cloud, Upload } from 'lucide-react';
import { exportArticlesToCloud } from '@/lib/utils/storage/exportStorage';
import { recordBackupPerformed } from '@/lib/utils/storage/backupStorage';

interface CloudBackupSectionProps {
  setDaysSinceBackup: (days: number) => void;
}

const CloudBackupSection: React.FC<CloudBackupSectionProps> = ({ setDaysSinceBackup }) => {
  const handleCloudConnect = (service: 'dropbox' | 'gdrive') => {
    toast.info(`${service === 'dropbox' ? 'Dropbox' : 'Google Drive'} integration coming soon!`);
    localStorage.setItem(`hlc-${service}-connected`, 'true');
  };
  
  const handleCloudBackup = async (service: 'dropbox' | 'gdrive') => {
    try {
      const success = await exportArticlesToCloud(service);
      
      if (success) {
        toast.success(`Backup to ${service === 'dropbox' ? 'Dropbox' : 'Google Drive'} successful`);
        recordBackupPerformed();
        setDaysSinceBackup(0);
      } else {
        throw new Error('Backup failed');
      }
    } catch (error) {
      toast.error(`Failed to backup to ${service === 'dropbox' ? 'Dropbox' : 'Google Drive'}`);
      console.error(error);
    }
  };

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-md font-medium mb-3">Cloud Services</h3>
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() => handleCloudConnect('dropbox')}
          className="flex gap-2 w-full"
        >
          <Cloud className="h-4 w-4" />
          Connect to Dropbox
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleCloudBackup('dropbox')}
          className="flex gap-2 w-full"
        >
          <Upload className="h-4 w-4" />
          Backup to Dropbox
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleCloudConnect('gdrive')}
          className="flex gap-2 w-full"
        >
          <Cloud className="h-4 w-4" />
          Connect to Google Drive
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleCloudBackup('gdrive')}
          className="flex gap-2 w-full"
        >
          <Upload className="h-4 w-4" />
          Backup to Google Drive
        </Button>
      </div>
    </div>
  );
};

export default CloudBackupSection;
