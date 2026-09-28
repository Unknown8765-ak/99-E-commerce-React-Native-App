import { API_BASE_URL } from "@/constants/api";
import { tokenService } from "./token.service";
import type {
  CreateOrderPayload,
  Order,
  OrderTracking,
} from "@/types/order.types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = await tokenService.getAccessToken();

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result.data;
};

export const orderService = {
  async createOrder(payload: CreateOrderPayload): Promise<Order> {
    return request<Order>("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getMyOrders(): Promise<Order[]> {
    return request<Order[]>("/orders");
  },

  async getOrderById(orderId: string): Promise<Order> {
    return request<Order>(`/orders/${orderId}`);
  },

  async cancelOrder(orderId: string): Promise<Order> {
    return request<Order>(`/orders/${orderId}/cancel`, {
      method: "PATCH",
    });
  },

  async trackOrder(orderId: string): Promise<OrderTracking> {
  return request<OrderTracking>(
    `/orders/${orderId}/track`
  );
},
};