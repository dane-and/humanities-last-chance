
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-background border-b p-4 mb-4 md:mb-8 lg:mb-4">
      <div className="container mx-auto flex flex-col md:flex-col lg:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-0 md:mb-2 lg:mb-0">Content Management</h1>
        <div className="flex gap-4 mt-2 md:mt-2 lg:mt-0">
          <Button variant="outline" onClick={() => navigate('/')}>
            View Site
          </Button>
          <Button variant="destructive" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
