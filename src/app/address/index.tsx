import { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Stack, router } from "expo-router";

import { useAddress } from "@/hooks/use-address";
import AddressCard from "@/components/address/address-card";
import EmptyAddress from "@/components/address/empty-address";

export default function AddressListScreen() {
  const {
    addresses,
    loading,
    error,
    loadAddresses,
    deleteAddress,
    setDefaultAddress,
  } = useAddress();

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const handleDelete = (addressId: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAddress(addressId);
            } catch (error) {
              Alert.alert(
                "Error",
                error instanceof Error
                  ? error.message
                  : "Failed to delete address"
              );
            }
          },
        },
      ]
    );
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      await setDefaultAddress(addressId);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to update default address"
      );
    }
  };

  if (loading && addresses.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error && addresses.length === 0) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>

        <Pressable style={styles.retryButton} onPress={loadAddresses}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "My Addresses" }} />

      <View style={styles.container}>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/address/add")}
        >
          <Text style={styles.addButtonText}>+ Add New Address</Text>
        </Pressable>

        {addresses.length === 0 ? (
          <EmptyAddress />
        ) : (
          <FlatList
            data={addresses}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.list}
            refreshing={loading}
            onRefresh={loadAddresses}
            renderItem={({ item }) => (
              <AddressCard
                address={item}
                onEdit={() =>
                  router.push({
                    pathname: "/address/edit/[id]",
                    params: { id: item._id },
                  })
                }
                onDelete={() => handleDelete(item._id)}
                onSetDefault={() => handleSetDefault(item._id)}
              />
            )}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
     backgroundColor: "#F2F6FF",
  },
  addButton: {
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#111",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  list: {
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#111",
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
});