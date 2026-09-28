import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductCard from "@/components/sidebar/ProductCard";
import { useSimilarProducts } from "@/hooks/use-similar-products";
import type { Product } from "@/types/product.types";

interface SimilarProductsSectionProps {
  productId: string;
  onProductPress: (product: Product) => void;
}

export default function SimilarProductsSection({
  productId,
  onProductPress,
}: SimilarProductsSectionProps) {
  const { products, isLoading, error } = useSimilarProducts(productId);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Similar Products</Text>

        <View style={styles.loader}>
          <ActivityIndicator size="small" />
        </View>
      </View>
    );
  }

  if (error || products.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Similar Products</Text>

      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ProductCard
              product={item}
              onPress={() => onProductPress(item)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 14,
    paddingHorizontal: 16, 
  },

  listContent: {
    paddingHorizontal: 11,
  },

  cardContainer: {
     width: 220,
      marginRight: 8,
      marginLeft: 12,
  },

  loader: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});