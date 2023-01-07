import { ProductType } from "../types/productType";

export default interface IHomePageState {
  products: Array<ProductType>,
  categories: Array<{ title: string, checked: boolean }>
}