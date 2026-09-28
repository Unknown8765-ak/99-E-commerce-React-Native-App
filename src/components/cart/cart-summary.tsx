import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CartSummaryProps {
  totalItems: number;
  totalAmount: number;
}

export default function CartSummary({
  totalItems,
  totalAmount,
}: CartSummaryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Total Items</Text>
        <Text style={styles.value}>{totalItems}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>₹{totalAmount}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>₹{totalAmount}</Text>
      </View>

      <Pressable
        style={styles.checkoutButton}
        onPress={() => router.push("/checkout")}
      >
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    color: "#6B7280",
    fontSize: 14,
  },
  value: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 6,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  checkoutButton: {
    backgroundColor: "#111827",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 12,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});