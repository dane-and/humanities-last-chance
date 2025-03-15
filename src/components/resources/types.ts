
import { ReactNode } from 'react';

export interface Resource {
  name: string;
  url: string;
  description?: string;
  icon?: ReactNode;
}

export interface ResourceCategory {
  id: string;
  name: string;
  resources: Resource[];
}
