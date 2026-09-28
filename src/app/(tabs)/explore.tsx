import { useState,useEffect } from "react";

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter,useLocalSearchParams } from "expo-router";

import { useCategories } from "@/hooks/use-categories";
import CategorySidebar from "@/components/sidebar/category-sidebar";
import CategoryProducts from "@/components/sidebar/category-products";

import type { Product } from "@/types/product.types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const router = useRouter();

  const {
    categories,
    isLoading,
    error,
    loadCategories,
  } = useCategories();

  const { categoryId } = useLocalSearchParams<{
  categoryId?: string;
}>();

const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
  categoryId ?? null
);

useEffect(() => {
  setSelectedCategoryId(categoryId ?? null);
}, [categoryId]);


  const handleProductPress = (product: Product) => {
    router.push({
      pathname: "/product/[id]",
      params: {
        id: product.slug,
      },
    });
  };

  if (isLoading) {
    return (
    <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.statusText}>
          Loading categories...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>
          {error}
        </Text>

        <Text
          onPress={loadCategories}
          style={styles.retry}
        >
          Try Again
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Categories
        </Text>
      </View>

      <View style={styles.content}>
        <CategorySidebar
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />

        <CategoryProducts
          selectedCategoryId={selectedCategoryId}
          onProductPress={handleProductPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "#F2F6FF",
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111111",
  },

  content: {
    flex: 1,
    flexDirection: "row",
     backgroundColor: "#F2F6FF",
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
    color: "#D32F2F",
    textAlign: "center",
  },

  retry: {
    color: "#111111",
    fontWeight: "700",
    marginTop: 12,
  },
});