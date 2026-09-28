export interface WishlistCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface WishlistProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: WishlistCategory;
  images: string[];
  price: number;
  stock: number;
  sku: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistResponse {
  statusCode: number;
  data: WishlistProduct[];
  message: string;
  success: boolean;
}