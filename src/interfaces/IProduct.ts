import { ProductType } from "../types/productType";

export interface IItemProps {
  product: ProductType;
  inCart?: boolean;
  onAddToCart(id: number): void;
  onRemoveFromCart(id: number): void;
}

export interface IListProps {
  products: Array<ProductType>;
  inCart?: number[];
  onAddToCart(id: number): void;
  onRemoveFromCart(id: number): void;
}