import IProducts from "../interfaces/IProducts";
import { ProductType } from "../types/productType";
import localCart from "../utiles/localCart";

class Products {
  getAll = async (): Promise<IProducts> => {
    const res: IProducts = await fetch(`${process.env.REACT_APP_BASE_URL}products?limit=100`).then(res => res.json());
    return res;
  };

  getOneById = async (id: number): Promise<ProductType> => {
    const res = await fetch(`https://dummyjson.com/products/${id}`).then(res => res.json());
    return res;
  };

  search = async (keyword: string): Promise<IProducts> => {
    const res: IProducts = await fetch(`${process.env.REACT_APP_BASE_URL}products/search?q=${keyword}`)
      .then(res => res.json());
    return res;
  };

  addToCart = async (id: number): Promise<void> => {
    const prod = await this.getOneById(id);
    localCart.addItem(prod);
  };

  removeFromCart = async (id: number): Promise<void> => {
    localCart.removeItem(id);
  };

  getCartProducts = async (): Promise<ProductType[]> => {
    const prods: ProductType[] = localCart.getItems();
    return prods;
  };
}

export const products = new Products();