import { Product } from '../product/types';

export interface ITableState {
  tables: Table[];
}

export enum TableStatus {
  DEFAULT,
  FILLED,
}

export interface Table {
  tableId: number;
  name: string;
  status?: TableStatus;
  start?: Date;
  end?: Date;
  products?: PickedProduct[];
}

export interface PickedProduct extends Product {
  qty: number;
  at_time?: Date;
}
