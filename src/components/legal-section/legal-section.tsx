import { StyleSheet, Text, View } from "react-native";

interface LegalSectionProps {
  title: string;
  content: string;
}

export default function LegalSection({
  title,
  content,
}: LegalSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5563",
  },
});