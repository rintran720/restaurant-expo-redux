import { RootState } from '../store';

export const tableSelector = (state: RootState) => {
  return state.table;
};
