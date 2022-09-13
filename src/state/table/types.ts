import { Good } from '../good/types';

export interface ITableState {
  tables: Table[];
}

export enum TableStatus {
  DEFAULT,
  FILLED,
}

export interface Table {
  no: string;
  name: string;
  status: TableStatus;
  start?: Date;
  end?: Date;
  goods?: PickedGood[];
}

export interface PickedGood extends Good {
  qty: number;
  at_time?: Date;
}
