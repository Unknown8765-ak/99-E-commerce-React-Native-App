import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Cart } from "@/types/cart.types";
import { cartService } from "@/services/cart.service";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  loadCart: () => Promise<void>;
  addToCart: (
    productId: string,
    quantity?: number
  ) => Promise<Cart>;
  updateCartItem: (
    productId: string,
    quantity: number
  ) => Promise<Cart>;
  removeCartItem: (productId: string) => Promise<Cart>;
  clearCart: () => Promise<Cart>;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await cartService.getCart();

      setCart(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load cart"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(
    async (productId: string, quantity: number = 1) => {
      try {
        setLoading(true);
        setError(null);

        const data = await cartService.addToCart(
          productId,
          quantity
        );

        setCart(data);

        return data;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to add item";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateCartItem = useCallback(
    async (productId: string, quantity: number) => {
      try {
        setLoading(true);
        setError(null);

        const data = await cartService.updateCartItem(
          productId,
          quantity
        );

        setCart(data);

        return data;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to update item";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const removeCartItem = useCallback(
    async (productId: string) => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await cartService.removeCartItem(productId);

        setCart(data);

        return data;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to remove item";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await cartService.clearCart();

      setCart(data);

      return data;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to clear cart";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        loadCart,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}