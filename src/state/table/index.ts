import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IAccountState } from './types';

const initialState: IAccountState = {
  tables: [],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    pop() {
      // do something
    },
    push(state, action: PayloadAction<number>) {
      state.table.push(action.payload);
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
