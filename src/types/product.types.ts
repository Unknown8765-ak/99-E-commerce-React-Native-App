export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  stock: number;
  category: ProductCategory | string;
  isActive: boolean;
  sku?: string;
  createdAt: string;
  updatedAt: string;
}