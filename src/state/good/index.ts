import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Good, IGoodState } from './types';

const initialState: IGoodState = {
  goods: [],
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
