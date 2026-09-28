import { useCallback } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { Category } from "@/types/category.types";

interface CategoryBannersProps {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
}

const { width } = Dimensions.get("window");

export default function CategoryBanners({
  categories,
  onCategoryPress,
}: CategoryBannersProps) {
  const renderCategory = useCallback(
    ({ item }: { item: Category }) => (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
        ]}
        onPress={() => onCategoryPress?.(item)}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.overlay}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </Pressable>
    ),
    [onCategoryPress]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories.slice(0, 5)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={renderCategory}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Fixed container
  container: {
    width: width - 32,
    height: 300,
    marginTop: 30,
    marginBottom: 30,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
  },

  // Only banners move
  list: {
    paddingRight: 16,
  },

  // Individual banner
  card: {
    width: width - 32,
    height: 300,
    borderRadius: 16,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  separator: {
    width: 12,
  },

  pressed: {
    opacity: 0.85,
  },
});