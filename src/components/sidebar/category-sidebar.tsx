import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { Category } from "@/types/category.types";

interface CategorySidebarProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategorySidebar({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={[
            styles.categoryItem,
            selectedCategoryId === null && styles.selectedItem,
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategoryId === null && styles.selectedText,
            ]}
          >
            All
          </Text>
        </Pressable>

        {categories.map((category) => {
          const isSelected = selectedCategoryId === category._id;

          return (
            <Pressable
              key={category._id}
              style={[styles.categoryItem, isSelected && styles.selectedItem]}
              onPress={() => onSelectCategory(category._id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.selectedText,
                ]}
              >
                {category.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop : 12,
    width: 118,
    backgroundColor: "#f5f5f5",
  },
  categoryItem: {
    paddingVertical: 18,
    paddingHorizontal: 6,
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
  },
  selectedItem: {
    backgroundColor: "#ffffff",
    borderLeftColor: "#111111",
  },
  categoryText: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
    
  },
  selectedText: {
    color: "#111111",
    fontWeight: "700",
  },
});