import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// import ProductCard from "@/components/product/product-card";
import ProductCard from "@/components/sidebar/ProductCard";
import { useCategoryProducts } from "@/hooks/use-category-products";
import type { Product } from "@/types/product.types";

type ProductSort = "newest" | "price_low" | "price_high";

interface CategoryProductsProps {
  selectedCategoryId: string | null;
  onProductPress: (product: Product) => void;
}

export default function CategoryProducts({
  selectedCategoryId,
  onProductPress,
  
}: CategoryProductsProps) {
  const [sort, setSort] = useState<ProductSort>("newest");
  const [showSortOptions, setShowSortOptions] = useState(false);

  const {
    products,
    isLoading,
    error,
    loadProducts,
  } = useCategoryProducts(selectedCategoryId, sort);

  const handleSortChange = (newSort: ProductSort) => {
    setSort(newSort);
    setShowSortOptions(false);
  };

  const getSortLabel = () => { 
    if (sort === "price_low") {
      return "Price: Low";
    }

    if (sort === "price_high") {
      return "Price: High";
    }

    return "Newest";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectedCategoryId ? "Category Products" : "All Products"}
        </Text>

        <Pressable
          style={styles.filterButton}
          onPress={() => setShowSortOptions((previous) => !previous)}
        >
          <Text style={styles.filterText}>
            ☷ {getSortLabel()}
          </Text>
        </Pressable>
      </View>

      {showSortOptions && (
        <View style={styles.sortMenu}>
          <Pressable
            style={styles.sortOption}
            onPress={() => handleSortChange("newest")}
          >
            <Text style={styles.sortOptionText}>
              Newest
            </Text>
          </Pressable>

          <Pressable
            style={styles.sortOption}
            onPress={() => handleSortChange("price_low")}
          >
            <Text style={styles.sortOptionText}>
              Price: Low to High
            </Text>
          </Pressable>

          <Pressable
            style={styles.sortOption}
            onPress={() => handleSortChange("price_high")}
          >
            <Text style={styles.sortOptionText}>
              Price: High to Low
            </Text>
          </Pressable>
        </View>
      )}

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />

          <Text style={styles.statusText}>
            Loading products...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>
            {error}
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={loadProducts}
          >
            <Text style={styles.retryText}>
              Try Again
            </Text>
          </Pressable>
        </View>
      ) : products.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>
            No Products Found
          </Text>

          <Text style={styles.emptyText}>
            Products are not available right now.
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => onProductPress(item)}
              style={{
                  width : "48%"
                }}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "#F2F6FF",
    paddingLeft: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
    marginTop: 20,
    marginBottom: 6,
  },

  filterButton: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#222222",
  },

  sortMenu: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    marginBottom: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  sortOption: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  sortOptionText: {
    fontSize: 13,
    color: "#222222",
    fontWeight: "500",
  },

  listContent: {
    paddingBottom: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  statusText: {
    marginTop: 8,
    fontSize: 13,
    color: "#777777",
  },

  errorText: {
    fontSize: 13,
    color: "#d32f2f",
    textAlign: "center",
  },

  retryButton: {
    marginTop: 12,
    backgroundColor: "#111111",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  retryText: {
    color: "#ffffff",
    fontWeight: "600",
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111111",
  },

  emptyText: {
    fontSize: 12,
    color: "#777777",
    marginTop: 6,
    textAlign: "center",
  },
});
