import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ITableState, Table, TableStatus } from './types';

const initialState: ITableState = {
  tables: [
    {
      no: 1,
      name: 'Drink',
      status: TableStatus.DEFAULT,
    },
    {
      no: 2,
      name: 'Drink 2',
      status: TableStatus.DEFAULT,
    },
    {
      no: 3,
      name: 'Drink 3',
      status: TableStatus.FILLED,
      start: new Date(),
      end: new Date(),
      cost: 100.2123,
      goods: [
        {
          name: 'ABDA',
          cost: 12.1,
          qty: 2,
        },
        {
          name: 'dasd',
          cost: 12.1,
          qty: 1,
        },
        {
          name: 'ABdasdasdaDA',
          cost: 12.1,
          qty: 4,
        },
        {
          name: 'ABsdasdadDA',
          cost: 12.1,
          qty: 3,
        },
        {
          name: 'ABDA',
          cost: 12.1,
          qty: 2,
        },
        {
          name: 'dasd',
          cost: 12.1,
          qty: 1,
        },
        {
          name: 'ABdasdasdaDA',
          cost: 12.12,
          qty: 10,
        },
        {
          name: 'ABsdasdadDA',
          cost: 12.1,
          qty: 3,
        },

        {
          name: 'ABDA',
          cost: 12.13,
          qty: 2,
        },
        {
          name: 'dasd',
          cost: 12.1,
          qty: 1,
        },
        {
          name: 'ABdasdasdaDA',
          cost: 12.1,
          qty: 4,
        },
        {
          name: 'ABsdasdadDA',
          cost: 12.1,
          qty: 3,
        },
      ],
    },
    {
      no: 4,
      name: 'Drink 4',
      status: TableStatus.DEFAULT,
    },
  ],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    pop() {
      // do something
    },
    push(state, action: PayloadAction<Table>) {
      state.tables.push(action.payload);
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
