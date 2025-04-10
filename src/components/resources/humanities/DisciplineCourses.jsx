
import React from 'react';
import PropTypes from 'prop-types';
import { 
  Accordion,
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '@/components/ui/accordion';
import CourseItem from './CourseItem';
import { disciplines } from '@/lib/data/youtubeUniversity';

const DisciplineCourses = ({ activeDiscipline, setActiveDiscipline }) => {
  // Filter the disciplines based on the active selection
  const disciplinesToDisplay = activeDiscipline 
    ? disciplines.filter(d => d.id === activeDiscipline) 
    : disciplines;

  return (
    <div>
      {/* Disciplines Dropdown */}
      <div className="mb-4">
        <select 
          className="w-full md:w-auto p-2 border border-border rounded-md bg-background"
          value={activeDiscipline || ""}
          onChange={(e) => setActiveDiscipline(e.target.value || null)}
        >
          <option value="">All Disciplines</option>
          {disciplines.map((discipline) => (
            <option key={discipline.id} value={discipline.id}>
              {discipline.name} ({discipline.courses.length})
            </option>
          ))}
        </select>
      </div>

      {/* Disciplines Accordion */}
      <Accordion type="multiple" className="w-full">
        {disciplinesToDisplay.map((discipline) => (
          <AccordionItem key={discipline.id} value={discipline.id} className="mb-4">
            <AccordionTrigger className="text-lg font-medium">
              {discipline.name} ({discipline.courses.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 pt-2">
                {discipline.courses.map((course) => (
                  <CourseItem 
                    key={course.id} 
                    course={{ ...course, disciplineName: discipline.name }} 
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Reset button when a discipline is selected */}
      {activeDiscipline && (
        <div className="mt-4">
          <button
            onClick={() => setActiveDiscipline(null)}
            className="text-sm text-primary hover:underline"
          >
            Show all disciplines
          </button>
        </div>
      )}
    </div>
  );
};

DisciplineCourses.propTypes = {
  activeDiscipline: PropTypes.string,
  setActiveDiscipline: PropTypes.func.isRequired
};

export default DisciplineCourses;
