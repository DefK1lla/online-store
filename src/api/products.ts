import IProducts from "../interfaces/IProducts";
import { ProductType } from "../types/productType";

class Products {
  getAll = async (): Promise<IProducts> => {
    const res: IProducts = await fetch(`${process.env.REACT_APP_BASE_URL}products?limit=100`).then(res => res.json());
    return res;
  };

  getOneById = async (id: number): Promise<ProductType> => {
    const res = await fetch(`https://dummyjson.com/products/${id}`).then(res => res.json());
    return res;
  };
}

export const products = new Products();