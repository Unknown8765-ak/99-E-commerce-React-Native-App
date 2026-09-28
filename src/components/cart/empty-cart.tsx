import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EmptyCart() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🛒</Text>

      <Text style={styles.title}>Your cart is empty</Text>

      <Text style={styles.subtitle}>
        Add some products and start shopping.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#111827",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});