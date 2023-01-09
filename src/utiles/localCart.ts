import { ProductType } from "../types/productType"

const localCart = {
  getItems(): ProductType[] {
    const cart: string | null = localStorage.getItem("cart");
    if (typeof cart === "string") return JSON.parse(cart);
    return [];
  },
  addItem(item: ProductType): void {
    const cart: ProductType[] = localCart.getItems();
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
  },
  removeItem(id: number): void {
    const cart: ProductType[] = localCart.getItems().filter((item: ProductType): boolean => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

export default localCart;