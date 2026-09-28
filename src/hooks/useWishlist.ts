import { useCallback, useEffect, useState } from "react";
import {
  getWishlist,
  addToWishlist as addToWishlistApi,
  removeFromWishlist as removeFromWishlistApi,
} from "@/services/wishlist.service";
import { WishlistProduct } from "@/types/wishlist.types";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getWishlist();

      // console.log("WISHLIST RESPONSE:", response.data);

      setWishlist(response.data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch wishlist"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const addToWishlist = async (productId: string) => {
    try {
      setError(null);

      await addToWishlistApi(productId);

      // GET wishlist again because POST response
      // contains wishlist document, not product array.
      await fetchWishlist();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to add to wishlist"
      );

      throw error;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      setError(null);

      await removeFromWishlistApi(productId);

      // GET updated product list again.
      await fetchWishlist();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to remove from wishlist"
      );

      throw error;
    }
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some(
      (item) => String(item._id) === String(productId)
    );
  };

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return {
    wishlist,
    loading,
    error,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  };
};