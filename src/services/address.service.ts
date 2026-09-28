import { API_BASE_URL } from "@/constants/api";
import { tokenService } from "./token.service";

import type {
  Address,
  CreateAddressPayload,
  UpdateAddressPayload,
} from "@/types/address.types";

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
    throw new Error(
      result.message || "Something went wrong"
    );
  }

  return result.data;
};

export const addressService = {
  // Get all addresses
  getAddresses: async (): Promise<Address[]> => {
    return request<Address[]>("/addresses");
  },

  // Get address by ID
  getAddressById: async (
    addressId: string
  ): Promise<Address> => {
    return request<Address>(`/addresses/${addressId}`);
  },

  // Create address
  createAddress: async (
    payload: CreateAddressPayload
  ): Promise<Address> => {
    return request<Address>("/addresses", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Update address
  updateAddress: async (
    addressId: string,
    payload: UpdateAddressPayload
  ): Promise<Address> => {
    return request<Address>(`/addresses/${addressId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  // Delete address
  deleteAddress: async (
    addressId: string
  ): Promise<null> => {
    return request<null>(`/addresses/${addressId}`, {
      method: "DELETE",
    });
  },

  // Set default address
  setDefaultAddress: async (
    addressId: string
  ): Promise<Address> => {
    return request<Address>(
      `/addresses/${addressId}/default`,
      {
        method: "PATCH",
      }
    );
  },
};