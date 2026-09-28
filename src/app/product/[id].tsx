import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, router } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";

import ProductInfo from "@/components/product/product-info";
import AddToCartButton from "@/components/product/add-to-cart-button";
import QuantitySelector from "@/components/product/quantity-selector";
import SimilarProductsSection from "@/components/product/similar-products-section";
import PreviouslyOrderedProducts from "@/components/product/PreviouslyOrderedProducts";

import { productService } from "@/services/product.service";
import type { Product } from "@/types/product.types";

const { width: screenWidth } = Dimensions.get("window");

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const data = await productService.getProductBySlug(id);

        console.log(data);

        setProduct(data);
        setCurrentImageIndex(0);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load product"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {error || "Product not found"}
        </Text>
      </View>
    );
  }

  const isOutOfStock = product.stock <= 0;

  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category.name;

  const increaseQuantity = () => {
    setQuantity((previousQuantity) =>
      Math.min(previousQuantity + 1, product.stock)
    );
  };

  const decreaseQuantity = () => {
    setQuantity((previousQuantity) =>
      Math.max(previousQuantity - 1, 1)
    );
  };

  const handleImageScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const index = Math.round(offsetX / screenWidth);

    setCurrentImageIndex(index);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Product Details",
          headerBackTitle: "Back",
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleImageScroll}
            scrollEventThrottle={16}
          >
            {product.images?.map((image, index) => (
              <Image
                key={`${image}-${index}`}
                source={{ uri: image }}
                style={styles.image}
                contentFit="cover"
              />
            ))}
          </ScrollView>

          {/* Image Dots */}
          {product.images && product.images.length > 1 && (
            <View style={styles.dotsContainer}>
              {product.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentImageIndex && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Product Information */}
        <ProductInfo
          name={product.name}
          price={product.price}
          category={categoryName}
          description={product.description}
          stock={product.stock}
        />

        {/* Quantity Selector */}
        {!isOutOfStock && (
          <QuantitySelector
            quantity={quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            maxQuantity={product.stock}
          />
        )}

        {/* Add To Cart */}
        <AddToCartButton
          productId={product._id}
          quantity={quantity}
          disabled={isOutOfStock}
        />

        {/* Similar Products */}
        <SimilarProductsSection
          productId={product._id}
          onProductPress={(selectedProduct) => {
            router.push(`/product/${selectedProduct.slug}`);
          }}
        />

        {/* Previously Ordered Products */}
        <PreviouslyOrderedProducts/>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F6FF",
  },

  content: {
    paddingBottom: 30,
  },

  imageContainer: {
    position: "relative",
    width: "100%",
  },

  image: {
    width: screenWidth,
    height: 500,
    backgroundColor: "#F5F5F5",
  },

  dotsContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#D0D0D0",
  },

  activeDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#000000",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  errorText: {
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
  },
});
