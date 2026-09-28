import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, Stack } from "expo-router";

import { useCart } from "@/hooks/use-cart";
import { useAddress } from "@/hooks/use-address";
import { useOrders } from "@/hooks/use-orders";

import AddressSelector from "@/components/checkout/address-selector";
import CheckoutSummary from "@/components/checkout/checkout-summary";

export default function CheckoutScreen() {
  const {
    cart,
    loading: cartLoading,
    loadCart,
  } = useCart();

  const {
    addresses,
    loading: addressLoading,
    loadAddresses,
  } = useAddress();

  const {
    createOrder,
    isLoading: orderLoading,
  } = useOrders();

  const [selectedAddressId, setSelectedAddressId] = useState<
    string | null
  >(null);

  useEffect(() => {
    loadCart();
    loadAddresses();
  }, [loadCart, loadAddresses]);

  useEffect(() => {
  if (addresses.length === 0) {
    setSelectedAddressId(null);
    return;
  }

  setSelectedAddressId((previousId) => {
    const isPreviousAddressValid = addresses.some(
      (address) => address._id === previousId
    );

    if (isPreviousAddressValid) {
      return previousId;
    }

    const defaultAddress = addresses.find(
      (address) => address.isDefault
    );

    return defaultAddress?._id ?? addresses[0]._id;
  });
}, [addresses]);

  const isLoading = cartLoading || addressLoading;

  const isCartEmpty = !cart || cart.items.length === 0;

  const canPlaceOrder =
    !isLoading &&
    !orderLoading &&
    !isCartEmpty &&
    Boolean(selectedAddressId);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      Alert.alert("Address Required", "Please select a delivery address.");
      return;
    }

    if (!cart || cart.items.length === 0) {
      Alert.alert("Empty Cart", "Your cart is empty.");
      return;
    }

    try {
      const order = await createOrder({
        addressId: selectedAddressId,
        paymentMethod: "cod",
      });

      Alert.alert(
        "Order Placed Successfully",
        `Your order ID is ${order._id}`,
        [
          {
            text: "View Order",
            onPress: () => router.replace(`/orders/${order._id}`),
          },
        ]
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to place order";

      Alert.alert("Order Failed", message);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading checkout...</Text>
      </View>
    );
  }

  if (isCartEmpty) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.replace("/(tabs)/explore")}
        >
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Checkout",
          headerBackTitle: "Cart",
        }}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Delivery Address</Text>

        <AddressSelector
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onSelect={setSelectedAddressId}
        />

        {addresses.length === 0 && (
          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push("/address/add")}
          >
            <Text style={styles.secondaryButtonText}>
              Add New Address
            </Text>
          </Pressable>
        )}

        <Text style={styles.sectionTitle}>Payment Method</Text>

        <View style={styles.paymentCard}>
          <Text style={styles.paymentTitle}>
            Cash on Delivery (COD)
          </Text>

          <Text style={styles.paymentDescription}>
            Pay when your order is delivered.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Order Details</Text>

        <CheckoutSummary cart={cart} />

        <Pressable
          style={[
            styles.primaryButton,
            !canPlaceOrder && styles.disabledButton,
          ]}
          disabled={!canPlaceOrder}
          onPress={handlePlaceOrder}
        >
          {orderLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Place Order</Text>
          )}
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 12,
     backgroundColor: "#F2F6FF",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 16,
  },
  loadingText: {
    fontSize: 14,
    color: "#666",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 19,
    fontWeight: "700",
    color: "#111",
  },
  paymentCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  paymentDescription: {
    marginTop: 5,
    fontSize: 13,
    color: "#666",
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
});