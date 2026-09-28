import { StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";

export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>99</Text>
        <Text style={styles.tagline}>Everything at ₹ 99...</Text>
      </View>

      <Pressable style={styles.cartButton} onPress={() => {
        router.push("/(tabs)/cart")
      }}>
        <Text style={styles.cartIcon}>🛒</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logo: {
    fontSize: 32,
    fontWeight: "800",
  },
  tagline: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  cartButton: {
    padding: 8,
  },
  cartIcon: {
    fontSize: 24,
  },
});