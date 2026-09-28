import { Pressable, StyleSheet, Text } from "react-native";

interface CategoryCardProps {
  name: string;
  emoji: string;
  onPress: () => void;
}

export default function CategoryCard({
  name,
  emoji,
  onPress,
}: CategoryCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 90,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111",
    textAlign: "center",
  },
});