import { API_BASE_URL } from "@/constants/api";
import type { Category } from "@/types/category.types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result.data;
};

export const categoryService = {
  // Get all active categories
  async getActiveCategories(): Promise<Category[]> {
    return request<Category[]>("/categories/active");
  },

  // Get category by ID
  async getCategoryById(categoryId: string): Promise<Category> {
    return request<Category>(`/categories/${categoryId}`);
  },
};