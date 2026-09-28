import { API_BASE_URL } from "@/constants/api";
import { WishlistResponse } from "../types/wishlist.types";

export const getWishlist = async (): Promise<WishlistResponse> => {
  const response = await fetch(`${API_BASE_URL}/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  return response.json();
};

export const addToWishlist = async (
  productId: string
): Promise<WishlistResponse> => {
  const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  // console.log("ADD WISHLIST STATUS:", response.status);
  // console.log("ADD WISHLIST RESPONSE:", data);

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to add product to wishlist"
    );
  }

  return data;
};

export const removeFromWishlist = async (
  productId: string
): Promise<WishlistResponse> => {
  const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove product from wishlist");
  }

  return response.json();
};