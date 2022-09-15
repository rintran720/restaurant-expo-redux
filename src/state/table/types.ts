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
  products: PickedProduct[];
}

export interface PickedProduct extends Product {
  qty: number;
}
