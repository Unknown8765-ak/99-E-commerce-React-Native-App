import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Address } from "@/types/address.types";

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId: string | null;
  onSelect: (addressId: string) => void;
}

export default function AddressSelector({
  addresses,
  selectedAddressId,
  onSelect,
}: AddressSelectorProps) {
  if (addresses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No saved address found. Please add an address first.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {addresses.map((address) => {
        const isSelected = selectedAddressId === address._id;

        return (
          <Pressable
            key={address._id}
            onPress={() => onSelect(address._id)}
            style={[
              styles.addressCard,
              isSelected && styles.selectedCard,
            ]}
          >
            <View style={styles.header}>
              <Text style={styles.name}>{address.fullName}</Text>

              <View
                style={[
                  styles.radio,
                  isSelected && styles.selectedRadio,
                ]}
              >
                {isSelected && <View style={styles.radioDot} />}
              </View>
            </View>

            <Text style={styles.type}>
              {address.type.toUpperCase()}
            </Text>

            <Text style={styles.address}>
              {address.addressLine1}
              {address.addressLine2
                ? `, ${address.addressLine2}`
                : ""}
            </Text>

            {address.landmark && (
              <Text style={styles.address}>
                Landmark: {address.landmark}
              </Text>
            )}

            <Text style={styles.address}>
              {address.city}, {address.state} - {address.postalCode}
            </Text>

            <Text style={styles.phone}>Phone: {address.phone}</Text>

            {address.isDefault && (
              <Text style={styles.defaultText}>Default Address</Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  emptyContainer: {
    padding: 16,
    borderRadius: 12,
     backgroundColor: "#F2F6FF",
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
  },
  addressCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  selectedCard: {
    borderColor: "#111",
    borderWidth: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  type: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: "700",
    color: "#777",
  },
  address: {
    marginTop: 5,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  phone: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  defaultText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "green",
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#aaa",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadio: {
    borderColor: "#111",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#111",
  },
});