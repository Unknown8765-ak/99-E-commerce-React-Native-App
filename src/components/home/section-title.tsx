import { Pressable, StyleSheet, Text, View } from "react-native";

interface SectionTitleProps {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
}

export default function SectionTitle({
  title,
  actionText,
  onActionPress,
}: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {actionText && (
        <Pressable onPress={onActionPress}>
          <Text style={styles.action}>
            {actionText}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  action: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },
});