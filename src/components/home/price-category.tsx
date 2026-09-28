

import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

const PRICES = [49, 99, 199, 249];

export default function PriceSection() {
  const handlePress = (price: number) => {
    console.log("Selected price:", price);
    router.push({
      pathname: "/price/[price]",
      params: { price: String(price) },
    });
  };

  return (
    <View style={styles.container}>
      {PRICES.map((price) => (
        <Pressable
          key={price}
          style={styles.card}
          onPress={() => handlePress(price)}
        >
          <Text style={styles.price}>₹{price}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 12,
  },

  card: {
    width: "23%",
    height: 92,
    borderRadius: 10,
    backgroundColor: "#991B1B",
    justifyContent: "center",
    alignItems: "center",
  },

  price: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});