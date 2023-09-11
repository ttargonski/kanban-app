import { Column } from './column.model';

export interface Board {
  uid: string;
  id: string;
  name: string;
  columns: Column[];
}
