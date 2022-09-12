import { RootState } from '../store';

export const goodsSelector = (state: RootState) => {
  return state.good.goods;
};
