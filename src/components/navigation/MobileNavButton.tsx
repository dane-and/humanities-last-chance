
import React from 'react';
import { Menu } from 'lucide-react';

interface MobileNavButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNavButton: React.FC<MobileNavButtonProps> = ({ isOpen, setIsOpen }) => {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center justify-center p-2 rounded-md bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      type="button"
    >
      {isOpen ? (
        <img src="/lovable-uploads/f590c355-5b49-4f27-8bef-541f52d68c3b.png" className="h-5 w-5" aria-hidden="true" alt="Close menu" />
      ) : (
        <Menu className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default MobileNavButton;
