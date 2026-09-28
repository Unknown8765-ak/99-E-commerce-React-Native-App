import { useCallback, useEffect, useState } from "react";
import { productService } from "@/services/product.service";
import type { Product } from "@/types/product.types";

export function useProducts(searchText = "") {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await productService.getActiveProducts({
        page: 1,
        limit: 10,
        search: searchText,
      });

      setProducts(data.products);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load products"
      );
    } finally {
      setIsLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}