import { useCallback, useEffect, useState } from "react";
import { productService } from "@/services/product.service";
import type { Product } from "@/types/product.types";

export function useSimilarProducts(productId: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSimilarProducts = useCallback(async () => {
    if (!productId) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await productService.getSimilarProducts(productId);

      setProducts(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load similar products"
      );
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchSimilarProducts();
  }, [fetchSimilarProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchSimilarProducts,
  };
}