
import React from 'react';
import { disciplines } from '@/lib/data/youtubeUniversity';
import { cn } from '@/lib/utils';

interface DisciplinesSidebarProps {
  activeDiscipline: string | null;
  onDisciplineChange: (id: string) => void;
}

const DisciplinesSidebar: React.FC<DisciplinesSidebarProps> = ({
  activeDiscipline,
  onDisciplineChange
}) => {
  return (
    <div className="w-full md:w-64 pr-4 mb-8 md:mb-0">
      <div className="bg-card rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-medium mb-4">Disciplines</h3>
        <div className="space-y-1">
          {disciplines.map((discipline) => (
            <button
              key={discipline.id}
              onClick={() => onDisciplineChange(discipline.id)}
              className={cn(
                'w-full text-left px-3 py-2 text-sm rounded-md transition-colors',
                activeDiscipline === discipline.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {discipline.name} ({discipline.courses.length})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisciplinesSidebar;
