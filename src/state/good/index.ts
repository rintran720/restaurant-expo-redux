import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Good, IGoodState } from './types';

const initialState: IGoodState = {
  goods: [
    {
      code: '123',
      name: 'ABDA',
      cost: 12.1,
    },
    {
      code: '123a',
      name: 'dasd',
      cost: 12.1,
    },
    {
      code: '1232',
      name: 'ABdasdasdaDA',
      cost: 12.1,
    },
    {
      code: '1231',
      name: 'ABsdasdadDA',
      cost: 12.1,
    },
    {
      code: '1234',
      name: 'ABDA',
      cost: 12.1,
    },
    {
      code: '1233',
      name: 'dasd',
      cost: 12.1,
    },
    {
      code: '1235',
      name: 'ABdasdasdaDA',
      cost: 12.12,
    },
    {
      code: '126',
      name: 'ABsdasdadDA',
      cost: 12.1,
    },
  ],
};

const goodSlice = createSlice({
  name: 'good',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    pop() {
      // do something
    },
    push(state, action: PayloadAction<Good>) {
      state.goods.push(action.payload);
    },
  },
  extraReducers: (builder) => {},
});

export const goodActions = goodSlice.actions;

export const goodReducer = goodSlice.reducer;
