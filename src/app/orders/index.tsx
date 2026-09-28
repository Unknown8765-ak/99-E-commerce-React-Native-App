import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { useOrders } from "@/hooks/use-orders";
import type { Order, OrderStatus } from "@/types/order.types";

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "delivered":
      return "#16A34A";
    case "cancelled":
      return "#DC2626";
    case "shipped":
    case "out_for_delivery":
      return "#2563EB";
    default:
      return "#D97706";
  }
};

const formatStatus = (status: string) =>
  status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function OrderCard({ order }: { order: Order }) {
  const statusColor = getStatusColor(order.orderStatus);

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/orders/[id]",
          params: { id: order._id },
        })
      }
    >
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>
          Order #{order._id.slice(-8).toUpperCase()}
        </Text>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${statusColor}18` },
          ]}
        >
          <Text style={[styles.statusText, { color: statusColor }]}>
            {formatStatus(order.orderStatus)}
          </Text>
        </View>
      </View>

      <Text style={styles.date}>
        {formatDate(order.createdAt)}
      </Text>

      <View style={styles.divider} />

      <View style={styles.cardFooter}>
        <Text style={styles.itemCount}>
          {order.items.length}{" "}
          {order.items.length === 1 ? "Item" : "Items"}
        </Text>

        <Text style={styles.amount}>
          ₹{order.totalAmount}
        </Text>
      </View>

      <Text style={styles.viewDetails}>View Details →</Text>
    </Pressable>
  );
}

export default function OrdersScreen() {
  const {
    orders,
    isLoading,
    error,
    loadOrders,
  } = useOrders();

  console.log("order index file",orders)

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  if (isLoading && orders.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading orders...</Text>
      </View>
    );
  }

  if (error && orders.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>

        <Pressable style={styles.retryButton} onPress={loadOrders}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <OrderCard order={item} />}
        contentContainerStyle={[
          styles.list,
          orders.length === 0 && styles.emptyList,
        ]}
        refreshing={isLoading}
        onRefresh={loadOrders}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.message}>
              Your orders will appear here.
            </Text>

            <Pressable
              style={styles.shopButton}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "#F2F6FF",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },
  list: {
    padding: 16,
    gap: 12,
  },
  emptyList: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  orderId: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: "#6B7280",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 14,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemCount: {
    fontSize: 13,
    color: "#6B7280",
  },
  amount: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  viewDetails: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  errorText: {
    fontSize: 14,
    color: "#DC2626",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#2563EB",
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  shopButton: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  shopButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});