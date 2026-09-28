import type { Product } from "@/types/product.types";

export interface CartItem {
  product: Product | string;
  quantity: number;
  price: number;
  _id?: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}