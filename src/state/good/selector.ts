import { RootState } from '../store';

export const goodSelector = (state: RootState) => {
  return state.good;
};
