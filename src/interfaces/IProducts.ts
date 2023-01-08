import { ProductType } from "../types/productType";

export default interface IProducts {
  limit: number,
  products: Array<ProductType>,
  skip: number,
  total: number
}
