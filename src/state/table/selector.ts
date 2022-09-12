import { RootState } from '../store';

export const tableSelector = (state: RootState) => {
  return state.table;
};

export const tablesSelector = (state: RootState) => {
  return state.table.tables;
};
