export { useCart } from "@/context/cart-context";

// import { useCallback, useState } from "react";

// import type { Cart } from "@/types/cart.types";
// import { cartService } from "@/services/cart.service";

// export function useCart() {
//   const [cart, setCart] = useState<Cart | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const loadCart = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const data = await cartService.getCart();
//       setCart(data);
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Failed to load cart"
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const addToCart = useCallback(
//     async (productId: string, quantity: number = 1) => {
//       try {
//         setLoading(true);
//         setError(null);

//         const data = await cartService.addToCart(
//           productId,
//           quantity
//         );

//         setCart(data);
//         return data;
//       } catch (err) {
//         const message =
//           err instanceof Error ? err.message : "Failed to add item";

//         setError(message);
//         throw err;
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   const updateCartItem = useCallback(
//     async (productId: string, quantity: number) => {
//       try {
//         setLoading(true);
//         setError(null);

//         const data = await cartService.updateCartItem(
//           productId,
//           quantity
//         );

//         setCart(data);
//         return data;
//       } catch (err) {
//         const message =
//           err instanceof Error ? err.message : "Failed to update item";

//         setError(message);
//         throw err;
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   const removeCartItem = useCallback(async (productId: string) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const data = await cartService.removeCartItem(productId);
//       setCart(data);

//       return data;
//     } catch (err) {
//       const message =
//         err instanceof Error ? err.message : "Failed to remove item";

//       setError(message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const clearCart = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const data = await cartService.clearCart();
//       setCart(data);

//       return data;
//     } catch (err) {
//       const message =
//         err instanceof Error ? err.message : "Failed to clear cart";

//       setError(message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return {
//     cart,
//     loading,
//     error,
//     loadCart,
//     addToCart,
//     updateCartItem,
//     removeCartItem,
//     clearCart,
//   };
// }