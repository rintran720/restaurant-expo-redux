export interface IProductState {
  products: Product[];
}

export interface Product {
  productId: string;
  name: string;
  cost: number;
}
