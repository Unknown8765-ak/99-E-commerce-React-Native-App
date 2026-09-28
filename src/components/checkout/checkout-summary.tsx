import { StyleSheet, Text, View } from "react-native";
import type { Cart } from "@/types/cart.types";

interface CheckoutSummaryProps {
  cart: Cart;
}

export default function CheckoutSummary({
  cart,
}: CheckoutSummaryProps) {
  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal >= 499 ? 0 : 40;
  const discount = 0;
  const totalAmount = subtotal + deliveryCharge - discount;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>

      {cart.items.map((item, index) => {
        const productName =
          typeof item.product === "string"
            ? "Product"
            : item.product.name;

        return (
          <View key={item._id ?? index} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {productName}
              </Text>

              <Text style={styles.quantity}>
                Qty: {item.quantity}
              </Text>
            </View>

            <Text style={styles.itemPrice}>
              ₹{item.price * item.quantity}
            </Text>
          </View>
        );
      })}

      <View style={styles.divider} />

      <View style={styles.priceRow}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>₹{subtotal}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.label}>Charge</Text>
        <Text style={styles.value}>
          {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
        </Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.label}>Discount</Text>
        <Text style={styles.value}>₹{discount}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalValue}>₹{totalAmount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },
  itemInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
  quantity: {
    marginTop: 4,
    fontSize: 12,
    color: "#777",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  priceRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginVertical: 6,
},

label: {
  fontSize: 14,
  color: "#666",
  flex: 1,
  flexShrink: 1,
},

value: {
  fontSize: 14,
  color: "#222",
  fontWeight: "600",
  marginLeft: 12,
  flexShrink: 0,
},
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
});