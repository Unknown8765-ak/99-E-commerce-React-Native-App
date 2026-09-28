import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useOrders } from "@/hooks/use-orders";
import type { OrderStatus } from "@/types/order.types";

const formatStatus = (status: string) =>
  status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

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

const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function OrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    selectedOrder,
    tracking,
    isLoading,
    error,
    loadOrderById,
    loadOrderTracking,
    cancelOrder,
  } = useOrders();

  console.log("tracking",tracking)
  console.log("selected orderr",selectedOrder)

  useEffect(() => {
    if (!id) return;

    loadOrderById(id);
    loadOrderTracking(id);
  }, [id, loadOrderById, loadOrderTracking]);

  const handleCancelOrder = () => {
    if (!id || !selectedOrder) return;

    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              await cancelOrder(id);

              Alert.alert(
                "Success",
                "Your order has been cancelled successfully."
              );
            } catch (err) {
              Alert.alert(
                "Error",
                err instanceof Error
                  ? err.message
                  : "Failed to cancel order"
              );
            }
          },
        },
      ]
    );
  };

  if (isLoading && !selectedOrder) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading order...</Text>
      </View>
    );
  }

  if (error && !selectedOrder) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>

        <Pressable
          style={styles.retryButton}
          onPress={() => {
            if (id) {
              loadOrderById(id);
              loadOrderTracking(id);
            }
          }}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  if (!selectedOrder) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Order not found</Text>
      </View>
    );
  }

  const statusColor = getStatusColor(selectedOrder.orderStatus);

  const canCancel = [
    "pending",
    "confirmed",
    "processing",
  ].includes(selectedOrder.orderStatus);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Order Header */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.headerInfo}>
            <Text style={styles.label}>Order ID</Text>

            <Text style={styles.orderId}>
              #{selectedOrder._id.slice(-8).toUpperCase()}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${statusColor}18` },
            ]}
          >
            <Text style={[styles.statusText, { color: statusColor }]}>
              {formatStatus(selectedOrder.orderStatus)}
            </Text>
          </View>
        </View>

        <Text style={styles.date}>
          Ordered on {formatDate(selectedOrder.createdAt)}
        </Text>
      </View>

      {/* Order Tracking */}
      <View style={styles.card}>
        <View style={styles.trackingHeader}>
          <View>
            <Text style={styles.sectionTitle}>Order Tracking</Text>

            {tracking ? (
              <Text style={styles.trackingCurrentText}>
                {tracking.orderStatus === "delivered"
                  ? "Your order has been delivered"
                  : tracking.orderStatus === "cancelled"
                    ? "Your order has been cancelled"
                    : `${formatStatus(tracking.orderStatus)} your order`}
              </Text>
            ) : null}
          </View>

          {tracking ? (
            <View
              style={[
                styles.trackingStatusBadge,
                {
                  backgroundColor: `${getStatusColor(
                    tracking.orderStatus as OrderStatus
                  )}18`,
                },
              ]}
            >
              <Text
                style={[
                  styles.trackingStatusText,
                  {
                    color: getStatusColor(
                      tracking.orderStatus as OrderStatus
                    ),
                  },
                ]}
              >
                {formatStatus(tracking.orderStatus)}
              </Text>
            </View>
          ) : null}
        </View>

        {!tracking ? (
          <View style={styles.trackingLoading}>
            <ActivityIndicator size="small" />
            <Text style={styles.trackingLoadingText}>
              Loading tracking...
            </Text>
          </View>
        ) : (
          <View style={styles.timeline}>
            {tracking.tracking.map((step, index) => {
              const isLast = index === tracking.tracking.length - 1;

              const stepColor = step.completed
                ? step.current
                  ? "#2563EB"
                  : "#16A34A"
                : "#D1D5DB";

              return (
                <View
                  key={step.status}
                  style={styles.timelineItem}
                >
                  {/* Timeline line */}
                  {!isLast ? (
                    <View
                      style={[
                        styles.timelineLine,
                        {
                          backgroundColor: step.completed
                            ? "#16A34A"
                            : "#E5E7EB",
                        },
                      ]}
                    />
                  ) : null}

                  {/* Timeline dot */}
                  <View
                    style={[
                      styles.timelineDot,
                      {
                        backgroundColor: step.completed
                          ? step.current
                            ? "#2563EB"
                            : "#16A34A"
                          : "#FFFFFF",
                        borderColor: stepColor,
                      },
                    ]}
                  >
                    {step.completed ? (
                      <Text style={styles.checkIcon}>✓</Text>
                    ) : null}
                  </View>

                  {/* Timeline content */}
                  <View style={styles.timelineContent}>
                    <View style={styles.timelineTitleRow}>
                      <Text
                        style={[
                          styles.timelineTitle,
                          {
                            color: step.completed
                              ? "#111827"
                              : "#9CA3AF",
                          },
                        ]}
                      >
                        {formatStatus(step.status)}
                      </Text>

                      {step.current ? (
                        <View style={styles.currentBadge}>
                          <Text style={styles.currentBadgeText}>
                            CURRENT
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    <Text
                      style={[
                        styles.timelineDescription,
                        {
                          color: step.completed
                            ? "#6B7280"
                            : "#9CA3AF",
                        },
                      ]}
                    >
                      {step.status === "pending" &&
                        "Order has been placed successfully"}

                      {step.status === "confirmed" &&
                        "Your order has been confirmed"}

                      {step.status === "processing" &&
                        "Your order is being prepared"}

                      {step.status === "shipped" &&
                        "Your order has been shipped"}

                      {step.status === "out_for_delivery" &&
                        "Your order is out for delivery"}

                      {step.status === "delivered" &&
                        "Your order has been delivered"}

                      {step.status === "cancelled" &&
                        "Your order has been cancelled"}

                      {step.status === "returned" &&
                        "Your order has been returned"}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {tracking?.cancelledAt ? (
  <View style={styles.specialStatusBox}>
    <Text style={styles.specialStatusTitle}>
      Order Cancelled
    </Text>

    <Text style={styles.specialStatusText}>
      Cancelled on {formatDate(tracking.cancelledAt)}
    </Text>
  </View>
          ) : null}

          {/* Delivery Information */}
          {selectedOrder.estimatedDeliveryDate ? (
            <View
              style={[
                styles.deliveredBox,
                selectedOrder.orderStatus === "delivered" &&
                  styles.deliveredBoxCompleted,
              ]}
            >
              <Text style={styles.deliveredTitle}>
                {selectedOrder.orderStatus === "delivered"
                  ? "Order Delivered"
                  : "Delivery By"}
              </Text>

              <Text style={styles.deliveredText}>
                {selectedOrder.orderStatus === "delivered"
                  ? tracking?.deliveredAt
                    ? `Delivered on ${formatDate(tracking.deliveredAt)}`
                    : `Delivered on ${formatDate(
                        selectedOrder.estimatedDeliveryDate
                      )}`
                  : `Delivery by ${formatDate(
                      selectedOrder.estimatedDeliveryDate
                    )}`}
              </Text>
            </View>
          ) : null}

      </View>

      {/* Order Items */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order Items</Text>

        {selectedOrder.items.map((item, index) => (
          <View key={`${item.product}-${index}`} style={styles.item}>
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text>📦</Text>
              </View>
            )}

            <View style={styles.itemInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>

              <Text style={styles.itemMeta}>
                Qty: {item.quantity}
              </Text>

              <Text style={styles.itemPrice}>
                ₹{item.price} × {item.quantity}
              </Text>
            </View>

            <Text style={styles.itemSubtotal}>
              ₹{item.subtotal}
            </Text>
          </View>
        ))}
      </View>

      {/* Shipping Address */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>

        <Text style={styles.addressName}>
          {selectedOrder.shippingAddress.fullName}
        </Text>

        <Text style={styles.addressText}>
          {selectedOrder.shippingAddress.addressLine1}
        </Text>

        {selectedOrder.shippingAddress.addressLine2 ? (
          <Text style={styles.addressText}>
            {selectedOrder.shippingAddress.addressLine2}
          </Text>
        ) : null}

        <Text style={styles.addressText}>
          {selectedOrder.shippingAddress.city},{" "}
          {selectedOrder.shippingAddress.state}
        </Text>

        <Text style={styles.addressText}>
          {selectedOrder.shippingAddress.postalCode},{" "}
          {selectedOrder.shippingAddress.country}
        </Text>

        <Text style={styles.addressPhone}>
          Phone: {selectedOrder.shippingAddress.phone}
        </Text>
      </View>

      {/* Payment Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment Details</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Payment Method</Text>

          <Text style={styles.summaryValue}>
            {selectedOrder.paymentMethod.toUpperCase()}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Payment Status</Text>

          <Text style={styles.summaryValue}>
            {formatStatus(selectedOrder.paymentStatus)}
          </Text>
        </View>
      </View>

      {/* Price Summary */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Price Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>

          <Text style={styles.summaryValue}>
            ₹{selectedOrder.subtotal}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Charge</Text>

          <Text style={styles.summaryValue}>
            ₹{selectedOrder.deliveryCharge}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount</Text>

          <Text style={styles.summaryValue}>
            -₹{selectedOrder.discount}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>

          <Text style={styles.totalValue}>
            ₹{selectedOrder.totalAmount}
          </Text>
        </View>
      </View>

      {/* Cancel Button */}
      {canCancel ? (
        <Pressable
          style={styles.cancelButton}
          onPress={handleCancelOrder}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.cancelButtonText}>
              Cancel Order
            </Text>
          )}
        </Pressable>
      ) : null}

      {/* Back Button */}
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },

  headerInfo: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
  },

  orderId: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  date: {
    marginTop: 12,
    fontSize: 13,
    color: "#6B7280",
  },

  sectionTitle: {
    marginBottom: 4,
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  /* Tracking */

  trackingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 18,
  },

  trackingCurrentText: {
    marginTop: 5,
    fontSize: 12,
    color: "#6B7280",
  },
  

  trackingStatusBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  trackingStatusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  trackingLoading: {
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  trackingLoadingText: {
    marginTop: 8,
    fontSize: 13,
    color: "#6B7280",
  },

  timeline: {
    paddingTop: 4,
  },

  timelineItem: {
    minHeight: 76,
    flexDirection: "row",
    position: "relative",
  },

  timelineLine: {
    position: "absolute",
    left: 11,
    top: 24,
    bottom: -4,
    width: 2,
  },

  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    backgroundColor: "#FFFFFF",
  },

  checkIcon: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  timelineContent: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 14,
  },

  timelineTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  timelineTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  timelineDescription: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
  },

  currentBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
  },

  currentBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#2563EB",
  },

  specialStatusBox: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#FEF2F2",
  },
  

  specialStatusTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#DC2626",
  },

  specialStatusText: {
    marginTop: 3,
    fontSize: 12,
    color: "#7F1D1D",
  },
  deliveredBox: {
  marginTop: 20,
  padding: 16,
  borderRadius: 12,
  backgroundColor: "#EFF6FF",
  borderWidth: 1,
  borderColor: "#BFDBFE",
},

deliveredBoxCompleted: {
  backgroundColor: "#F0FDF4",
  borderColor: "#BBF7D0",
},

deliveredTitle: {
  fontSize: 15,
  fontWeight: "700",
  color: "#111827",
},

deliveredText: {
  marginTop: 5,
  fontSize: 14,
  color: "#6B7280",
},

  // deliveredBox: {
  //   marginTop: 8,
  //   padding: 12,
  //   borderRadius: 10,
  //   backgroundColor: "#F0FDF4",
  // },

  // deliveredTitle: {
  //   fontSize: 13,
  //   fontWeight: "700",
  //   color: "#16A34A",
  // },

  // deliveredText: {
  //   marginTop: 3,
  //   fontSize: 12,
  //   color: "#166534",
  // },

  /* Items */

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },

  productImage: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },

  imagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  itemInfo: {
    flex: 1,
  },

  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  itemMeta: {
    marginTop: 5,
    fontSize: 12,
    color: "#6B7280",
  },

  itemPrice: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },

  itemSubtotal: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  /* Address */

  addressName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },

  addressText: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 20,
  },

  addressPhone: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },

  /* Summary */

  summaryRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginVertical: 6,
  gap: 12,
},

summaryLabel: {
  flex: 1,
  minWidth: 0,
  fontSize: 13,
  color: "#6B7280",
},

summaryValue: {
  flexShrink: 1,
  fontSize: 13,
  fontWeight: "600",
  color: "#111827",
  textAlign: "right",
},

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  /* Buttons */

  cancelButton: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
  },

  cancelButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  backButton: {
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  backButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },

  /* States */

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 10,
    color: "#6B7280",
  },

  errorText: {
    textAlign: "center",
    color: "#DC2626",
    fontSize: 14,
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
});


// import { useCallback, useEffect, useMemo } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { router } from "expo-router";

// import ProductCard from "@/components/sidebar/ProductCard";
// import { useOrders } from "@/hooks/use-orders";

// export default function OrdersProducts() {
//   const {
//     orders,
//     isLoading,
//     error,
//     loadOrders,
//   } = useOrders();

//   useEffect(() => {
//     loadOrders();
//   }, [loadOrders]);

//   /**
//    * Extract unique products from previous orders
//    *
//    * Backend order item structure:
//    *
//    * {
//    *   product: string,
//    *   name: string,
//    *   sku: string,
//    *   image: string,
//    *   quantity: number,
//    *   price: number,
//    *   subtotal: number
//    * }
//    */
//   const products = useMemo(() => {
//     const productMap = new Map<string, any>();

//     orders.forEach((order) => {
//       order.items?.forEach((item: any) => {
//         const productId = item.product;

//         if (!productId) return;

//         if (!productMap.has(productId)) {
//           productMap.set(productId, {
//             _id: productId,
//             name: item.name,
//             image: item.image,
//             price: item.price,
//             sku: item.sku,
//           });
//         }
//       });
//     });

//     return Array.from(productMap.values());
//   }, [orders]);

//   const handleProductPress = useCallback((productId: string) => {
//     router.push({
//       pathname: "/product/[id]",
//       params: {
//         id: productId,
//       },
//     });
//   }, []);

//   if (isLoading && orders.length === 0) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />

//         <Text style={styles.loadingText}>
//           Loading your previous products...
//         </Text>
//       </View>
//     );
//   }

//   if (error && orders.length === 0) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorTitle}>
//           Something went wrong
//         </Text>

//         <Text style={styles.errorText}>
//           {error}
//         </Text>
//       </View>
//     );
//   }

//   if (!isLoading && products.length === 0) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.emptyIcon}>
//           📦
//         </Text>

//         <Text style={styles.emptyTitle}>
//           No Previous Products
//         </Text>

//         <Text style={styles.emptyText}>
//           Products from your previous orders will appear here.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>
//           Previous Products
//         </Text>

//         <Text style={styles.count}>
//           {products.length}{" "}
//           {products.length === 1 ? "Product" : "Products"}
//         </Text>
//       </View>

//       <FlatList
//         data={products}
//         keyExtractor={(item) => item._id}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContent}
//         columnWrapperStyle={styles.columnWrapper}
//         refreshing={isLoading}
//         onRefresh={loadOrders}
//         renderItem={({ item }) => (
//           <View style={styles.cardWrapper}>
//             <ProductCard
//               product={item}
//               onPress={() => handleProductPress(item._id)}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },

//   header: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     paddingBottom: 12,
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   count: {
//     marginTop: 4,
//     fontSize: 14,
//     color: "#6B7280",
//   },

//   listContent: {
//     paddingHorizontal: 12,
//     paddingBottom: 24,
//   },

//   columnWrapper: {
//     justifyContent: "space-between",
//   },

//   cardWrapper: {
//     width: "48%",
//     marginBottom: 16,
//   },

//   center: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 24,
//   },

//   loadingText: {
//     marginTop: 12,
//     fontSize: 14,
//     color: "#6B7280",
//   },

//   errorTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#DC2626",
//     marginBottom: 8,
//   },

//   errorText: {
//     fontSize: 14,
//     color: "#6B7280",
//     textAlign: "center",
//   },

//   emptyIcon: {
//     fontSize: 42,
//     marginBottom: 12,
//   },

//   emptyTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 8,
//   },

//   emptyText: {
//     fontSize: 14,
//     color: "#6B7280",
//     textAlign: "center",
//   },
// });


