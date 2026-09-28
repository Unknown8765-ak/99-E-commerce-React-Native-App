import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Address } from "@/types/address.types";

interface AddressCardProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.type}>
            {address.type.toUpperCase()}
          </Text>

          {address.isDefault && (
            <Text style={styles.defaultBadge}>DEFAULT</Text>
          )}
        </View>

        <Pressable onPress={onEdit}>
          <Text style={styles.edit}>Edit</Text>
        </Pressable>
      </View>

      <Text style={styles.name}>{address.fullName}</Text>

      <Text style={styles.text}>{address.phone}</Text>

      <Text style={styles.text}>{address.addressLine1}</Text>

      {address.addressLine2 && (
        <Text style={styles.text}>{address.addressLine2}</Text>
      )}

      {address.landmark && (
        <Text style={styles.text}>
          Landmark: {address.landmark}
        </Text>
      )}

      <Text style={styles.text}>
        {address.city}, {address.state} - {address.postalCode}
      </Text>

      <Text style={styles.text}>{address.country}</Text>

      <View style={styles.actions}>
        {!address.isDefault && (
          <Pressable onPress={onSetDefault}>
            <Text style={styles.actionText}>Set Default</Text>
          </Pressable>
        )}

        <Pressable onPress={onDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  type: {
    fontSize: 12,
    fontWeight: "700",
    color: "#555",
  },
  defaultBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: "#15803d",
  },
  edit: {
    fontWeight: "600",
    color: "#2563eb",
  },
  name: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "700",
  },
  text: {
    marginTop: 5,
    color: "#555",
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginTop: 18,
  },
  actionText: {
    fontWeight: "600",
    color: "#2563eb",
  },
  deleteText: {
    fontWeight: "600",
    color: "#dc2626",
  },
});