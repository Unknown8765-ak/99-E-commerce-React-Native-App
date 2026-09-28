import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import ProductCard from "@/components/sidebar/ProductCard";
import { useOrders } from "@/hooks/use-orders";
import { productService } from "@/services/product.service";
import type { Product } from "@/types/product.types";

export default function PreviouslyOrderedProducts() {
  const {
  orders,
  loadOrders,
  isLoading: isOrdersLoading,
} = useOrders();
  

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
  // console.log("ORDERS FROM PREVIOUS COMPONENT:", orders);

}, [orders]); 

  useEffect(() => {
    const loadPreviouslyOrderedProducts = async () => {
      if (orders.length === 0) {
        // setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const productIds = Array.from(
          new Set(
            orders.flatMap((order) =>
              order.items.map((item) => item.product)
            )
          )
        );

        // console.log("PREVIOUS PRODUCT IDS:", productIds);

        const results = await Promise.allSettled(
          productIds.map((productId) =>
            productService.getProductById(productId)
          )
        );

        // console.log("PRODUCT RESULTS:", results);

        const validProducts = results
          .filter(
            (
              result
            ): result is PromiseFulfilledResult<Product> =>
              result.status === "fulfilled"
          )
          .map((result) => result.value);

//         // console.log("PREVIOUS PRODUCTS:", validProducts);
//         console.log("PRODUCT IMAGES:",
//   validProducts.map((product) => ({
//     name: product.name,
//     images: product.images,
//   }))
// );

        setProducts(validProducts);
      } catch (error) {
        console.error(
          "PREVIOUS PRODUCTS ERROR:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadPreviouslyOrderedProducts();
  }, [orders]);

  const handleProductPress = (product: Product) => {
    // console.log("PRODUCT CLICKED:", product);

    router.push(`/product/${product.slug}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previously Ordered</Text>

      {(isLoading || isOrdersLoading) && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" />
          <Text style={styles.loadingText}>
            Loading previously ordered products...
          </Text>
        </View>
      )}

      {!isLoading && products.length === 0 && (
        <Text style={styles.emptyText}>
          No previously ordered products found.
        </Text>
      )}

      {!isLoading && products.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onPress={handleProductPress}
              style={styles.productCard}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    paddingHorizontal: 16,
  },

  loader: {
    minHeight: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  loadingText: {
    fontSize: 13,
  },

  emptyText: {
    paddingHorizontal: 16,
    fontSize: 14,
  },

  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },

  productCard: {
    width: 160,
  },
});