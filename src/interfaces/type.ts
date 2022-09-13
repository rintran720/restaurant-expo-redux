import { Table } from '../state/table/types';

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
  Report: undefined;
  Setting: undefined;
};

export interface IHandleState {
  loading: boolean;
  error?: string;
}
