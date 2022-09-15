import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IProductState, Product } from './types';

const initialState: IProductState = {
  products: [
    {
      productId: '123',
      name: 'ABDA',
      cost: 12.1,
    },
    {
      productId: '123a',
      name: 'dasd',
      cost: 12.1,
    },
    {
      productId: '1232',
      name: 'ABdasdasdaDA',
      cost: 12.1,
    },
    {
      productId: '1231',
      name: 'ABsdasdadDA',
      cost: 12.1,
    },
    {
      productId: '1234',
      name: 'ABDA',
      cost: 12.1,
    },
    {
      productId: '1233',
      name: 'dasd',
      cost: 12.1,
    },
    {
      productId: '1235',
      name: 'ABdasdasdaDA',
      cost: 12.12,
    },
    {
      productId: '126',
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
