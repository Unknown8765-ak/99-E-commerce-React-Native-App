import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { useWishlist } from "@/hooks/useWishlist";

interface WishlistButtonProps {
  productId: string;
}

export default function WishlistButton({
  productId,
}: WishlistButtonProps) {
  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  const [loading, setLoading] = useState(false);

  const wishlisted = isWishlisted(productId);
  // console.log("BUTTON PRODUCT:", productId);
// console.log("IS WISHLISTED:", wishlisted);

  const handleWishlist = async () => {
    try {
      setLoading(true);

      if (wishlisted) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Wishlist update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      disabled={loading}
      onPress={handleWishlist}
      style={({ pressed }) => [
        styles.button,
        wishlisted && styles.activeButton,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#EF4444"
        />
      ) : (
        <Text style={styles.heart}>
          {wishlisted ? "❤️" : "♡"}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#FFF1F2",
    justifyContent: "center",
    alignItems: "center",
  },

  activeButton: {
    backgroundColor: "#FFE4E6",
  },

  heart: {
    fontSize: 28,
    lineHeight: 32,
  },

  pressed: {
    opacity: 0.7,
  },
});