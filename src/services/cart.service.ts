import type { Cart } from "@/types/cart.types";
import { API_BASE_URL } from "@/constants/api";
import { tokenService } from "./token.service";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = await tokenService.getAccessToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...options.headers,
    },
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result.data;
};

export const cartService = {
  getCart: async (): Promise<Cart> => {
    return request<Cart>("/cart");
  },

  addToCart: async (
    productId: string,
    quantity: number = 1
  ): Promise<Cart> => {
    return request<Cart>("/cart", {
      method: "POST",
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
  },

  updateCartItem: async (
    productId: string,
    quantity: number
  ): Promise<Cart> => {
    return request<Cart>(`/cart/item/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({
        quantity,
      }),
    });
  },

  removeCartItem: async (productId: string): Promise<Cart> => {
    return request<Cart>(`/cart/item/${productId}`, {
      method: "DELETE",
    });
  },

  clearCart: async (): Promise<Cart> => {
    return request<Cart>("/cart/clear", {
      method: "DELETE",
    });
  },
};