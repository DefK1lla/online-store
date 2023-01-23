import { PrettyDOMOptions } from "@testing-library/react";

export type ProductType = {
  id: number,
  title: string,
  brand: string,
  description: string,
  discountPercentage: number,
  images: Array<string>,
  price: number,
  rating: number,
  stock: string,
  thumbnail: string,
  category: string
};

export type CartProductType = PrettyDOMOptions & {
  count: number
}