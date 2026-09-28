import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useCategories } from "@/hooks/use-categories";

import HomeHeader from "@/components/home/home-header";
import HomeHeaderContent from "@/components/home/home-header-content";
import CategoryList from "@/components/home/category-list";
import NewProducts from "@/components/home/new-products";
import ProductCard from "@/components/sidebar/ProductCard";
import CategoryBanners from "@/components/home/category-banners";
import SectionTitle from "@/components/home/section-title";
import PriceCategory from "@/components/home/price-category";
import PreviouslyOrderedProducts from "@/components/product/PreviouslyOrderedProducts";

import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/types/product.types";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const {
  products,
  isLoading,
  error,
  refetch: fetchProducts,
} = useProducts(submittedSearch);
  const {
  categories,
  isLoading: isCategoriesLoading,
  error: categoriesError,
} = useCategories();

  const handleProductPress = useCallback((product: Product) => {
  router.push({
    pathname: "/product/[id]",
    params: {
      id: product.slug,
    },
  });
}, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={styles.columnWrapper}
        refreshing={isLoading}
        onRefresh={fetchProducts}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={handleProductPress}
            style={{
              width :"48%"
            }}
          />
        )}
        ListHeaderComponent={
          <View>
            <HomeHeader />

            <HomeHeaderContent
              searchText={searchText}
              onSearchChange={setSearchText}
              onSearchSubmit={() => {
                setSubmittedSearch(searchText.trim());
              }}
            />
            <PriceCategory />

          
            <View style={styles.section}>
              <SectionTitle title="Shop by Category" />

              <CategoryList
                onCategoryPress={(categoryId) => {
                  console.log("Selected category:", categoryId);
                }}
              />
            </View>
            
            <NewProducts
              products={products}
              onProductPress={handleProductPress}
            />

            {/* Popular Products */}
            <View style={styles.productHeader}>
              <SectionTitle
                title="Popular Products"
                actionText="See All"
                onActionPress={() => {
                  router.push({
                    pathname: "/explore",
                  });
                }}
              />
            </View>

        
            {isLoading && (
              <ActivityIndicator
                size="large"
                style={styles.loader}
              />
            )}


            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
              </View>

              
        }

       ListFooterComponent={
          <View>
            {!isCategoriesLoading && !categoriesError && (
              <CategoryBanners
                categories={categories}
                onCategoryPress={(category) => {
                  router.push({
                    pathname: "/(tabs)/explore",
                    params: {
                      categoryId: category._id,
                    },
                  });
                }}
              />
            )}

          <NewProducts
            products={products}
            onProductPress={handleProductPress}
          />

           <PreviouslyOrderedProducts/>
          
        </View>
    }
        
      />
      
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
safeArea: {
  flex: 1,
  backgroundColor: "#F2F6FF",
},

contentContainer: {
  backgroundColor: "#F2F6FF",
  paddingBottom: 50,
},
  section: {
    marginTop: 26,
    paddingLeft: 20,
    paddingRight: 6,
    paddingVertical: 18,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
  },

  productHeader: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#F4F7F5",
  },

  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  loader: {
    marginTop: 35,
    marginBottom: 25,
  },

  errorContainer: {
    marginHorizontal: 20,
    marginTop: 25,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 20,
    backgroundColor: "#FFF1F1",
    borderWidth: 1,
    borderColor: "#FFD5D5",

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,

    alignItems: "center",
    justifyContent: "center",
  },

  errorText: {
    color: "#D32F2F",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
  },

  emptyText: {
    textAlign: "center",
    color: "#777777",
    fontSize: 14,
    marginTop: 30,
    marginBottom: 20,
  },
});
