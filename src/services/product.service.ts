// import { API_BASE_URL } from "@/constants/api";
// import type { Product } from "@/types/product.types";

// export interface ProductsResponse {
//   products: Product[];
//   pagination: {
//     currentPage: number;
//     totalPages: number;
//     totalProducts: number;
//     limit: number;
//   };
// }

// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message: string;
// }

// export interface GetProductsParams {
//   page?: number;
//   limit?: number;
//   search?: string;
//   category?: string;
//   sort?: "newest" | "price_low" | "price_high";
// }

// const request = async <T>(endpoint: string): Promise<T> => {
//   const response = await fetch(`${API_BASE_URL}${endpoint}`);

//   let result: ApiResponse<T>;

//   try {
//     result = await response.json();
//   } catch {
//     throw new Error("Invalid server response");
//   }

//   if (!response.ok) {
//     throw new Error(result.message || "Something went wrong");
//   }

//   return result.data;
// };



// export const productService = {
//   // Get active products with filters
//   async getActiveProducts(
//     params: GetProductsParams = {}
//   ): Promise<ProductsResponse> {
//     const {
//       page = 1,
//       limit = 10,
//       search,
//       category,
//       sort = "newest",
//     } = params;

//     const queryParams = new URLSearchParams();

//     queryParams.append("page", String(page));
//     queryParams.append("limit", String(limit));
//     queryParams.append("sort", sort);

//     if (search?.trim()) {
//       queryParams.append("search", search.trim());
//     }

//     if (category) {
//       queryParams.append("category", category);
//     }

//     return request<ProductsResponse>(
//       `/products/active?${queryParams.toString()}`
//     );
//   },

//   async getProductById(productId: string): Promise<Product> {
//   return request<Product>(
//     `/products/${encodeURIComponent(productId)}`
//   );
// },

//   // Get product by slug
//   async getProductBySlug(slug: string): Promise<Product> {
//     return request<Product>(
//       `/products/slug/${encodeURIComponent(slug)}`
//     );
//   },
//   async getSimilarProducts(productId: string): Promise<Product[]> {
//     return request<Product[]>(
//       `/products/${encodeURIComponent(productId)}/similar`
//     );
//   },
// };

import { API_BASE_URL } from "@/constants/api";
import { tokenService } from "./token.service";
import type { Product } from "@/types/product.types";

export interface ProductsResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    limit: number;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: "newest" | "price_low" | "price_high";
}

const request = async <T>(endpoint: string): Promise<T> => {
  const token = await tokenService.getAccessToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
  });

  let result: ApiResponse<T>;

  try {
    result = await response.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result.data;
};

export const productService = {
  async getActiveProducts(
    params: GetProductsParams = {}
  ): Promise<ProductsResponse> {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      sort = "newest",
    } = params;

    const queryParams = new URLSearchParams();

    queryParams.append("page", String(page));
    queryParams.append("limit", String(limit));
    queryParams.append("sort", sort);

    if (search?.trim()) {
      queryParams.append("search", search.trim());
    }

    if (category) {
      queryParams.append("category", category);
    }

    return request<ProductsResponse>(
      `/products/active?${queryParams.toString()}`
    );
  },

  async getProductBySlug(slug: string): Promise<Product> {
    return request<Product>(
      `/products/slug/${encodeURIComponent(slug)}`
    );
  },

  async getProductById(productId: string): Promise<Product> {
    return request<Product>(
      `/products/${encodeURIComponent(productId)}`
    );
  },

  async getSimilarProducts(productId: string): Promise<Product[]> {
    return request<Product[]>(
      `/products/${encodeURIComponent(productId)}/similar`
    );
  },
};