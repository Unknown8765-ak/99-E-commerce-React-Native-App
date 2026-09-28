import { StyleSheet, Text, View } from "react-native";
import SearchBar from "@/components/home/search-bar";

interface HomeHeaderContentProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  onSearchSubmit: () => void;
}

export default function HomeHeaderContent({
  searchText,
  onSearchChange,
  onSearchSubmit,
}: HomeHeaderContentProps) {
  return (
    <View>
      <SearchBar
        value={searchText}
        onChangeText={onSearchChange}
        onSubmit={onSearchSubmit}
      />

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Everything at ₹99</Text>

        <Text style={styles.bannerSubtitle}>
          Shop smart. Save more.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#F2F2F2",
  },

  bannerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
  },

  bannerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
});