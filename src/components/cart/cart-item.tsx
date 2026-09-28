import { Image } from "expo-image";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { CartItem } from "@/types/cart.types";

interface CartItemProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  isLoading?: boolean;
}

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  isLoading = false,
}: CartItemProps) {
  const product =
    typeof item.product === "string" ? null : item.product;

  const productName = product?.name ?? "Product";
  // const productImage = product?.images?.[0];

  return (
    <View style={styles.container}>
      {/* <Image
        source={
          productImage
            ? { uri: productImage }
            : require("@/assets/images/icon.png")
        }
        style={styles.image}
        contentFit="cover"
      /> */}

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {productName}
        </Text>

        <Text style={styles.price}>₹{item.price}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.quantityContainer}>
            <Pressable
              style={styles.quantityButton}
              onPress={onDecrease}
              disabled={isLoading || item.quantity <= 1}
            >
              <Text style={styles.quantityText}>−</Text>
            </Pressable>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <Pressable
              style={styles.quantityButton}
              onPress={onIncrease}
              disabled={isLoading}
            >
              <Text style={styles.quantityText}>+</Text>
            </Pressable>
          </View>

          <Pressable onPress={onRemove} disabled={isLoading}>
            <Text style={styles.removeText}>Remove</Text>
          </Pressable>
        </View>
      </View>

      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 8,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    color: "#111827",
  },
  quantity: {
    minWidth: 28,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  removeText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "600",
  },
  loader: {
    position: "absolute",
    right: 12,
    top: 12,
  },
});