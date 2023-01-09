import { ProductType } from "../types/productType";

export interface IState {
  products: Array<ProductType>,
  total: number,
  open: boolean,
  isSended: boolean
}