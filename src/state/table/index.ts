import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Product } from '../product/types';
import { ITableState, Table } from './types';

const initialState: ITableState = {
  tables: Array.from(Array(20).keys()).map((i) => {
    return {
      tableId: i + 1,
      name: `Table ${i + 1}`,
      products: [],
    };
  }),
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    pop() {
      // do something
    },
    createTable(state, action: PayloadAction<Table>) {
      state.tables.push(action.payload);
    },
    updateTable(state, action: PayloadAction<Table & { id: number }>) {
      const { id, ...table } = action.payload;
      state.tables = state.tables.map((tb) => {
        if (tb.tableId === id) {
          return table;
        }
        return tb;
      });
    },
    deleteTable(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const index = state.tables.findIndex((tb) => tb.tableId === id);
      if (index > -1) {
        state.tables.splice(index, 1);
      }
    },
    checkoutTable(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const index = state.tables.findIndex((tb) => tb.tableId === id);
      if (index > -1) {
        state.tables[index].products = [];
      }
    },
    addProduct(state, action: PayloadAction<{ id: number; product: Product }>) {
      const { id, product } = action.payload;
      const index = state.tables.findIndex((tb) => tb.tableId === id);
      if (index > -1) {
        const products = state.tables[index].products;
        if (products) {
          const prodIndex = products.findIndex(
            (p) => p.productId === product.productId,
          );
          if (prodIndex > -1) {
            state.tables[index].products[prodIndex].qty =
              state.tables[index].products[prodIndex].qty + 1;
          } else {
            state.tables[index].products.push({ ...product, qty: 1 });
          }
        }
      }
    },
    removeProduct(
      state,
      action: PayloadAction<{ id: number; product: Product }>,
    ) {
      const { id, product } = action.payload;
      const index = state.tables.findIndex((tb) => tb.tableId === id);
      if (index > -1) {
        const products = state.tables[index].products;
        if (products) {
          const prodIndex = products.findIndex(
            (p) => p.productId === product.productId,
          );
          if (prodIndex > -1) {
            if (state.tables[index].products[prodIndex].qty === 1) {
              state.tables[index].products.splice(prodIndex, 1);
            } else if (state.tables[index].products[prodIndex].qty > 1) {
              state.tables[index].products[prodIndex].qty =
                state.tables[index].products[prodIndex].qty - 1;
            }
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    // SignIn
    // builder.addCase(
    //   signInThunk.pending,
    //   (state: IAccountState, action: { payload: any }) => {
    //     state.signIn.loading = true;
    //     state.signIn.error = '';
    //   },
    // );
    // builder.addCase(
    //   signInThunk.fulfilled,
    //   (state: IAccountState, action: { payload: any }) => {
    //     state.signIn.loading = false;
    //     state.accessToken = action.payload.token;
    //   },
    // );
    // builder.addCase(
    //   signInThunk.rejected,
    //   (state: IAccountState, action: { payload: any; error: any }) => {
    //     state.signIn.loading = false;
    //     state.signIn.error = action.error.message;
    //   },
    // );
  },
});

export const tableActions = tableSlice.actions;

export const tableReducer = tableSlice.reducer;
