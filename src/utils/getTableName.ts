import { Table } from '../state/table/types';

export const getTableName = (table: Table) => {
  return table.name.length === 0 ? table.no : `${table.no} - ${table.name}`;
};
