import { memo } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  style?: StyleProp<ViewStyle>;
}

function ProductCard({ product, onPress, style }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;

  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name;

  return (
    <Pressable
      style={({ pressed }) => [
        style,
        styles.container,
        pressed && styles.pressed,
      ]}
      disabled={isOutOfStock}
      onPress={() => onPress(product)}
    >
      <View style={styles.imageContainer}>
        {product.images?.length > 0 ? (
          <Image
  source={{
    uri: `${product.images[0]}?auto=format&fit=crop&w=500&q=80`,
  }}
  style={styles.image}
  resizeMode="cover"
  onError={(event) => {
    console.log("IMAGE LOAD ERROR:", event.nativeEvent.error);
    console.log("IMAGE URL:", product.images[0]);
  }}
/>
        ) : (
          <View style={styles.noImage}>
            <Text style={styles.noImageText}>No Image</Text>
          </View>
        )}

        {isOutOfStock && (
          <View style={styles.stockOverlay}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.name}>
          {product.name}
        </Text>

        <Text style={styles.price}>₹{product.price}</Text>

        {categoryName && <Text style={styles.category}>{categoryName}</Text>}
      </View>
    </Pressable>
  );
}

export default memo(ProductCard);

const styles = StyleSheet.create({
  container: {
    // width: "48%",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    overflow: "hidden",
    marginBottom: 16,
  },

  pressed: {
    opacity: 0.7,
  },

  imageContainer: {
    height: 150,
    backgroundColor: "#F5F5F5",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  noImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  noImageText: {
    color: "#888888",
    fontSize: 12,
  },

  stockOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  outOfStockText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  content: {
    padding: 12,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222222",
    minHeight: 38,
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111111",
    marginTop: 8,
  },

  category: {
    fontSize: 11,
    color: "#777777",
    marginTop: 4,
  },
});
