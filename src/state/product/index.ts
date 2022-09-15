import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IProductState, Product } from './types';

const initialState: IProductState = {
  products: [
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

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    pop() {
      // do something
    },
    push(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
  },
  extraReducers: (builder) => {},
});

export const productActions = productSlice.actions;

export const productReducer = productSlice.reducer;
