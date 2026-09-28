import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCart } from "@/hooks/use-cart";
import WishlistButton from "@/components/product/wishlist-button";

interface AddToCartButtonProps {
  productId: string;
  disabled?: boolean;
  quantity: number;
}

export default function AddToCartButton({
  productId,
  disabled = false,
  quantity,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      await addToCart(productId, quantity);

      Alert.alert("Success", "Product added to cart!");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to add product to cart"
      );
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <View style={styles.container}>
      {/* Add to Cart */}
      <Pressable
        disabled={isDisabled}
        onPress={handleAddToCart}
        style={({ pressed }) => [
          styles.cartButton,
          isDisabled && styles.disabledButton,
          pressed && !isDisabled && styles.pressed,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>
            {disabled ? "Out of Stock" : "Add to Cart"}
          </Text>
        )}
      </Pressable>

      {/* Wishlist */}
      <WishlistButton productId={productId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    gap: 10,
  },

  cartButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#111111",
    justifyContent: "center",
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: "#999999",
  },

  pressed: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
