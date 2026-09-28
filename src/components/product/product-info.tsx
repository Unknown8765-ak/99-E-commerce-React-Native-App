import { StyleSheet, Text, View } from "react-native";

interface ProductInfoProps {
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
}

export default function ProductInfo({
  name,
  price,
  category,
  description,
  stock,
}: ProductInfoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>{category}</Text>

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.price}>₹{price}</Text>

      <Text style={styles.description}>{description}</Text>

      <Text
        style={[
          styles.stock,
          stock > 0 ? styles.available : styles.unavailable,
        ]}
      >
        {stock > 0 ? `${stock} items available` : "Out of Stock"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  category: {
    fontSize: 13,
    color: "#777",
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
  },
  price: {
    fontSize: 26,
    fontWeight: "800",
    marginTop: 12,
    color: "#111",
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#555",
    marginTop: 16,
  },
  stock: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 16,
  },
  available: {
    color: "#16803C",
  },
  unavailable: {
    color: "#D32F2F",
  },
});