import { useCallback, useState } from "react";
import { orderService } from "@/services/order.service";
import type {
  CreateOrderPayload,
  Order,
  OrderTracking,
} from "@/types/order.types";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [tracking, setTracking] = useState<OrderTracking | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await orderService.getMyOrders();

      setOrders(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load orders";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadOrderById = useCallback(
    async (orderId: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await orderService.getOrderById(orderId);

        setSelectedOrder(data);

        return data;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load order";

        setError(message);

        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const loadOrderTracking = useCallback(
    async (orderId: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await orderService.trackOrder(orderId);

        setTracking(data);

        return data;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load order tracking";

        setError(message);

        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const createOrder = useCallback(
    async (payload: CreateOrderPayload) => {
      try {
        setIsLoading(true);
        setError(null);

        const newOrder =
          await orderService.createOrder(payload);

        setOrders((previousOrders) => [
          newOrder,
          ...previousOrders,
        ]);

        return newOrder;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to create order";

        setError(message);

        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const cancelOrder = useCallback(
    async (orderId: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const cancelledOrder =
          await orderService.cancelOrder(orderId);

        setOrders((previousOrders) =>
          previousOrders.map((order) =>
            order._id === orderId
              ? cancelledOrder
              : order
          )
        );

        setSelectedOrder((previousOrder) =>
          previousOrder?._id === orderId
            ? cancelledOrder
            : previousOrder
        );

        return cancelledOrder;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to cancel order";

        setError(message);

        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    orders,
    selectedOrder,
    tracking,
    isLoading,
    error,
    loadOrders,
    loadOrderById,
    loadOrderTracking,
    createOrder,
    cancelOrder,
  };
}