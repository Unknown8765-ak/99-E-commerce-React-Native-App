import type { Product } from "@/types/product.types";

export const products: Product[] = [
  {
    _id: "product-1",
    name: "Premium Cotton T-Shirt",
    slug: "premium-cotton-t-shirt",
    description: "Comfortable cotton t-shirt",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],
    price: 99,
    stock: 20,
    category: "Fashion",
    isActive: true,
  },
  {
    _id: "product-2",
    name: "Wireless Earphones",
    slug: "wireless-earphones",
    description: "Compact wireless earphones",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    ],
    price: 99,
    stock: 15,
    category: "Electronics",
    isActive: true,
  },
  {
    _id: "product-3",
    name: "Minimal Desk Lamp",
    slug: "minimal-desk-lamp",
    description: "Modern desk lamp",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    ],
    price: 99,
    stock: 10,
    category: "Home",
    isActive: true,
  },
  {
    _id: "product-4",
    name: "Skincare Face Cream",
    slug: "skincare-face-cream",
    description: "Daily skincare cream",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    ],
    price: 99,
    stock: 0,
    category: "Beauty",
    isActive: true,
  },
];