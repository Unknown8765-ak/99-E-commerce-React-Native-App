import { useMemo } from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import ProductCard from "@/components/sidebar/ProductCard";
import SectionTitle from "@/components/home/section-title";
import type { Product } from "@/types/product.types";

interface NewProductsProps {
  products: Product[];
  onProductPress: (product: Product) => void;
}

export default function NewProducts({
  products,
  onProductPress,
}: NewProductsProps) {
  const newProducts = useMemo(() => {
    return [...products]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 6);
  }, [products]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <SectionTitle title="New Products" />
      </View>

      <View style={styles.productGrid}>
        {newProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onPress={onProductPress}
            style={{
              width: "48%",
             }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },

  titleContainer: {
    paddingHorizontal: 20,
  },

  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 16,
  },
});
