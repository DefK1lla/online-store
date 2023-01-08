import { ChecboxType } from "../types/filterTypes";
import { ProductType } from "../types/productType";

export interface IState {
  products: Array<ProductType>,
  categories: Array<ChecboxType>,
  brands: Array<ChecboxType>
}