
import React, { useState } from 'react';
import FeaturedCourses from './humanities/FeaturedCourses';
import DisciplineCourses from './humanities/DisciplineCourses';

const HumanitiesLastChanceU: React.FC = () => {
  const [activeDiscipline, setActiveDiscipline] = useState<string | null>(null);
  
  return (
    <div>
      <div className="prose max-w-none mb-8">
        <h2 className="text-2xl font-serif">
          Humanities Last Chance U
        </h2>
        <p>
          Our curated collection of high-quality courses available for free on YouTube, organized by academic discipline. Most entries include links to course sites where you can find reading lists and other supplemental material relevant to the courses.
        </p>
      </div>

      {/* Featured Courses Carousel */}
      <FeaturedCourses />

      {/* Disciplines Section */}
      <DisciplineCourses 
        activeDiscipline={activeDiscipline} 
        setActiveDiscipline={setActiveDiscipline}
      />
    </div>
  );
};

export default HumanitiesLastChanceU;
