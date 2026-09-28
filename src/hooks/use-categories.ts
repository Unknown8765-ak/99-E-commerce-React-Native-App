import { useCallback, useEffect, useState } from "react";
import { categoryService } from "@/services/category.service";
import type { Category } from "@/types/category.types";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await categoryService.getActiveCategories();

      setCategories(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load categories";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    isLoading,
    error,
    loadCategories,
  };
};