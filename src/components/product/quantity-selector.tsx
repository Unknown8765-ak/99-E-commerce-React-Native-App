import { Pressable, StyleSheet, Text, View } from "react-native";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  maxQuantity?: number;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  maxQuantity = 99,
}: QuantitySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Quantity</Text>

      <View style={styles.controls}>
        <Pressable
          style={[
            styles.button,
            quantity <= 1 && styles.disabledButton,
          ]}
          disabled={quantity <= 1}
          onPress={onDecrease}
        >
          <Text style={styles.buttonText}>−</Text>
        </Pressable>

        <Text style={styles.quantity}>{quantity}</Text>

        <Pressable
          style={[
            styles.button,
            quantity >= maxQuantity && styles.disabledButton,
          ]}
          disabled={quantity >= maxQuantity}
          onPress={onIncrease}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  button: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#111111",
    justifyContent: "center",
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: "#D5D5D5",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },

  quantity: {
    minWidth: 20,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
  },
});