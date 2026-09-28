import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

export default function EmptyAddress() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📍</Text>

      <Text style={styles.title}>No addresses found</Text>

      <Text style={styles.subtitle}>
        Add an address to make your checkout easier.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/address/add")}
      >
        <Text style={styles.buttonText}>Add Address</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    textAlign: "center",
    color: "#666",
  },
  button: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#111",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});