import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { productService } from "@/services/product.service";
import type { Product } from "@/types/product.types";

type ProductSort = "newest" | "price_low" | "price_high";

export const useCategoryProducts = (
  categoryId: string | null,
  sort: ProductSort
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await productService.getActiveProducts({
        category: categoryId ?? undefined,
        page: 1,
        limit: 10,
        sort,
      });

      setProducts(result.products);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load products";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, sort]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    isLoading,
    error,
    loadProducts,
  };
};