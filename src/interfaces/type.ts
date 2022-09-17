import { Product } from '@state/product/types';
import { Table } from '@state/table/types';

export type AppRootParamsList = {
  Home: undefined;
  Table: {
    table: Table;
  };
  TableManagement: undefined;
  TableDetail: {
    action: string;
    table: Table;
  };
  ProductManagement: undefined;
  ProductDetail: {
    action: string;
    product: Product;
  };
  Report: undefined;
  Setting: undefined;
  ImportExport: undefined;
};

export interface IHandleState {
  loading: boolean;
  error?: string;
}
