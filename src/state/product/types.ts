export interface IProductState {
  products: Product[];
}

export interface Product {
  code: string;
  name: string;
  cost: number;
}
