import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useWishlist } from "@/hooks/useWishlist";
import { router } from "expo-router";

export default function Wishlist() {
  const {
    wishlist,
    loading,
    error,
    removeFromWishlist,
  } = useWishlist();

  // Loading
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading wishlist...</Text>
      </View>
    );
  }

  // Error
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Empty wishlist
  if (wishlist.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>❤️</Text>

        <Text style={styles.emptyTitle}>
          Your Wishlist is Empty
        </Text>

        <Text style={styles.emptyDescription}>
          Save products you love and find them here later.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist ❤️</Text>

        <Text style={styles.headerSubtitle}>
          {wishlist.length}{" "}
          {wishlist.length === 1 ? "item" : "items"} saved
        </Text>
      </View>

      {/* Wishlist Products */}
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
         <Pressable
            style={styles.productCard}
            onPress={() => {(item);
            router.push({
            pathname: "/product/[id]",
            params: {
              id: item.slug,
            },
        });
      }}
            android_ripple={{ color: "#E5E7EB" }}
          >
            {/* Product Image */}
            <Image
              source={{
                uri: item.images?.[0],
              }}
              style={styles.productImage}
              resizeMode="cover"
            />

            {/* Product Details */}
            <View style={styles.productDetails}>
              <View>
                <Text
                  style={styles.productName}
                  numberOfLines={2}
                >
                  {item.name}
                </Text>

                <Text
                  style={styles.category}
                  numberOfLines={1}
                >
                  {item.category?.name}
                </Text>

                <Text style={styles.price}>
                  ₹{item.price}
                </Text>
              </View>

              {/* Remove */}
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(item._id);
                }}
                style={styles.removeButton}
                activeOpacity={0.7}
              >
                <Text style={styles.removeText}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "#F2F6FF",
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  headerSubtitle: {
    marginTop: 5,
    fontSize: 14,
    color: "#6B7280",
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  // Product Card
  productCard: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
  },

  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
  },

  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },

  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 21,
  },

  category: {
    marginTop: 5,
    fontSize: 13,
    color: "#6B7280",
  },

  price: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  removeButton: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#FEF2F2",
  },

  removeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#EF4444",
  },

  // Loading
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
  },

  // Error
  errorText: {
    textAlign: "center",
    fontSize: 15,
    color: "#EF4444",
  },

  // Empty
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 52,
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },

  emptyDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
    textAlign: "center",
  },
});
