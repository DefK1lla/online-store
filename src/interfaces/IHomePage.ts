import { CheckboxType } from "../types/filterTypes";
import { ProductType } from "../types/productType";

export interface IState {
  products: Array<ProductType>,
  filteredProducts: Array<ProductType>,
  categories: Array<CheckboxType>,
  brands: Array<CheckboxType>,
  searchValue: string,
  sort: string
}