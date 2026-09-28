import { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import ProductCard from "@/components/sidebar/ProductCard";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/types/product.types";

export default function PriceProductsScreen() {
  const router = useRouter();

  const { price } = useLocalSearchParams<{
    price: string;
  }>();

  const selectedPrice = Number(price);

  const {
    products,
    isLoading,
    error,
    refetch,
  } = useProducts();
  const handleProductPress = (product: Product) => {
  router.push({
    pathname: "/product/[id]",
    params: {
      id: product.slug,
    },
  });
};

  const priceProducts = useMemo(() => {
    return products.filter(
      (product) => Number(product.price) === selectedPrice
    );
  }, [products, selectedPrice]);

  if (isLoading && products.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#DC2626" />

        <Text style={styles.loadingText}>
          Loading products...
        </Text>
      </SafeAreaView>
    );
  }

  if (error && products.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorTitle}>
          Something went wrong
        </Text>

        <Text style={styles.errorText}>
          {error}
        </Text>

        <Pressable
          style={styles.retryButton}
          onPress={refetch}
        >
          <Text style={styles.retryText}>
            Try Again
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.banner}>
        <Text style={styles.bannerPrice}>
          ₹{selectedPrice}
        </Text>

        <Text style={styles.bannerText}>
          All products at this price
        </Text>
      </View>

      {/* Product Count */}

      <Text style={styles.productCount}>
        {priceProducts.length}{" "}
        {priceProducts.length === 1
          ? "Product"
          : "Products"}
      </Text>

      {/* Products */}

      <FlatList
        data={priceProducts}
        keyExtractor={(item) => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.productWrapper}>
            <ProductCard
              product={item}
              onPress={handleProductPress}
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>
              🛍️
            </Text>

            <Text style={styles.emptyTitle}>
              No Products Found
            </Text>

            <Text style={styles.emptyText}>
              No products available at ₹
              {selectedPrice}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  // Price Banner
  banner: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 14,
    // marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#DC2626",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },

  bannerPrice: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginRight: 12,
  },

  bannerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 19,
  },

  // Product Count
  productCount: {
    marginHorizontal: 16,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
  },

  // Product List
  list: {
    paddingHorizontal: 2,
    paddingBottom: 28,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },

  productWrapper: {
    width: "50%",
    alignItems: "center",
  },

  // Empty State
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 80,
  },

  emptyIcon: {
    fontSize: 46,
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: "#6B7280",
    textAlign: "center",
  },

  // Loading / Error
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 24,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },

  errorTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  errorText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: "#DC2626",
    textAlign: "center",
  },

  retryButton: {
    marginTop: 18,
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#DC2626",
  },

  retryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});

