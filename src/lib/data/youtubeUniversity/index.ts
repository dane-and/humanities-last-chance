
import { Discipline } from './types';
import { philosophy } from './philosophy';
import { history } from './history';
import { literature } from './literature';
import { religion } from './religion';
import { music } from './music';
import { architecture } from './architecture';
import { blackStudies } from './blackStudies';
import { mediaStudies } from './mediaStudies';
import { linguistics } from './linguistics';
import { politicalScience } from './politicalScience';

// Combine all disciplines into a single array
export const disciplines: Discipline[] = [
  philosophy,
  history,
  literature,
  religion,
  music,
  architecture,
  blackStudies,
  mediaStudies,
  linguistics,
  politicalScience
];

// Re-export types
export type { Course, Discipline } from './types';
