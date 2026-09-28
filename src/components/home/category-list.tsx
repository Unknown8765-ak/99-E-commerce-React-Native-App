import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useCategories } from "@/hooks/use-categories";
import CategoryCard from "@/components/home/category-card";
import { router } from "expo-router";
import categoryEmojis from "@/constants/categories";

interface CategoryListProps {
  onCategoryPress?: (categoryId: string) => void;
}

export default function CategoryList({
  onCategoryPress,
}: CategoryListProps) {
  const {
    categories,
    isLoading,
    error,
    loadCategories,
  } = useCategories();
  // console.log(categories[0])

  

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="small" />
        <Text style={styles.message}>Loading categories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>

        <Text style={styles.retry} onPress={loadCategories}>
          Try Again
        </Text>
      </View>
    );
  }

  if (categories.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>
          No categories available
        </Text>
      </View>
    );
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CategoryCard
              name={item.name}
              emoji={categoryEmojis[item.slug] || "🛍️"}
                onPress={() => {
                  router.push({
                    pathname: "/(tabs)/explore",
                    params: {
                      categoryId: item._id,
                    },
                });
              }}
            />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },
  listContent: {
    paddingRight: 16,
  },
  center: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginTop: 6,
    fontSize: 13,
    color: "#666",
  },
  error: {
    fontSize: 13,
    color: "red",
    textAlign: "center",
  },
  retry: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
});