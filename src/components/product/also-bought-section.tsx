import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductCard from "@/components/sidebar/ProductCard";
import type { Product } from "@/types/product.types";

interface AlsoBoughtSectionProps {
  products: Product[];
  onProductPress?: (product: Product) => void;
}

export default function AlsoBoughtSection({
  products,
  onProductPress,
}: AlsoBoughtSectionProps) {
  if (!products.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>People Also Bought</Text>

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
              onPress={() => onProductPress?.(item)}
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
    marginBottom: 14,
    paddingHorizontal: 16,
  },

  listContent: {
    paddingHorizontal: 16,
  },

  cardContainer: {
  width: 180,
  marginRight: 12,
},
});