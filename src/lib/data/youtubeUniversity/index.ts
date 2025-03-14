
import { Discipline } from './types';
import { philosophy } from './philosophy';
import { history } from './history';
import { literature } from './literature';
import { religion } from './religion';

// Combine all disciplines into a single array
export const disciplines: Discipline[] = [
  philosophy,
  history,
  literature,
  religion
];

// Re-export types
export type { Course, Discipline } from './types';
