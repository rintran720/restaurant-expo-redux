import { RootState } from '../store';

export const productsSelector = (state: RootState) => {
  return state.product.products;
};
