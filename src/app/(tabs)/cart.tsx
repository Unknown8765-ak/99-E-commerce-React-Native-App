import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCart } from "@/hooks/use-cart";
import CartItemCard from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import EmptyCart from "@/components/cart/empty-cart";
import type { CartItem } from "@/types/cart.types";

export default function CartScreen() {
  const {
    cart,
    loading,
    error,
    loadCart,
    updateCartItem,
    removeCartItem,
    clearCart,
  } = useCart();

  const [actionItemId, setActionItemId] = useState<string | null>(null);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const getProductId = (item: CartItem): string | null => {
    if (typeof item.product === "string") {
      return item.product;
    }

    return item.product?._id ?? null;
  };

  const handleIncrease = async (item: CartItem) => {
    const productId = getProductId(item);

    if (!productId) {
      Alert.alert("Error", "Product ID is missing");
      return;
    }

    try {
      setActionItemId(productId);

      await updateCartItem(productId, item.quantity + 1);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to update quantity"
      );
    } finally {
      setActionItemId(null);
    }
  };

  const handleDecrease = async (item: CartItem) => {
    const productId = getProductId(item);

    if (!productId || item.quantity <= 1) {
      return;
    }

    try {
      setActionItemId(productId);

      await updateCartItem(productId, item.quantity - 1);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to update quantity"
      );
    } finally {
      setActionItemId(null);
    }
  };

  const handleRemove = (item: CartItem) => {
    const productId = getProductId(item);

    if (!productId) {
      Alert.alert("Error", "Product ID is missing");
      return;
    }

    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              setActionItemId(productId);

              await removeCartItem(productId);
            } catch (error) {
              Alert.alert(
                "Error",
                error instanceof Error
                  ? error.message
                  : "Failed to remove item"
              );
            } finally {
              setActionItemId(null);
            }
          },
        },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await clearCart();
            } catch (error) {
              Alert.alert(
                "Error",
                error instanceof Error
                  ? error.message
                  : "Failed to clear cart"
              );
            }
          },
        },
      ]
    );
  };

  const totalItems = useMemo(() => {
    return (
      cart?.items.reduce(
        (total, item) => total + item.quantity,
        0
      ) ?? 0
    );
  }, [cart]);

  const totalAmount = useMemo(() => {
    return (
      cart?.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ) ?? 0
    );
  }, [cart]);

  const renderItem = useCallback(
    ({ item }: { item: CartItem }) => {
      const productId = getProductId(item);

      return (
        <CartItemCard
          item={item}
          onIncrease={() => handleIncrease(item)}
          onDecrease={() => handleDecrease(item)}
          onRemove={() => handleRemove(item)}
          isLoading={actionItemId === productId}
        />
      );
    },
    [actionItemId]
  );


  if (loading && !cart) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading cart...
        </Text>
      </SafeAreaView>
    );
  }

  if (error && !cart) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            title: "My Cart",
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerTitleStyle: {
              fontSize: 17,
              fontWeight: "700",
              color: "#111827",
            },
            headerShadowVisible: false,
          }}
        />

        <EmptyCart />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          title: `My Cart (${totalItems})`,
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "700",
            color: "#111827",
          },
          headerShadowVisible: false,
        }}
      />

      <View style={styles.container}>
        <FlatList
          data={cart.items}
          keyExtractor={(item, index) =>
            getProductId(item) ?? `cart-item-${index}`
          }
          renderItem={renderItem}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={loadCart}
              tintColor="#111827"
            />
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.heading}>
                Your Cart
              </Text>

              <Text style={styles.itemCount}>
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"}
              </Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              <CartSummary
                totalItems={totalItems}
                totalAmount={totalAmount}
              />

              <Text
                style={styles.clearCart}
                onPress={handleClearCart}
              >
                Clear Cart
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
     backgroundColor: "#F2F6FF",
  },

  container: {
    flex: 1,
     backgroundColor: "#F2F6FF",
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },

  header: {
    marginBottom: 16,
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  itemCount: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 5,
  },

  footer: {
    marginTop: 6,
  },

  clearCart: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 18,
    paddingVertical: 12,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#6B7280",
  },

  errorText: {
    color: "#DC2626",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
});