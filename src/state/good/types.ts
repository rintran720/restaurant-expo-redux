export interface IGoodState {
  goods: Good[];
}

export interface Good {
  code: string;
  name: string;
  cost: number;
}
