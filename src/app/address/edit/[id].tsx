import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  View,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

import AddressForm from "@/components/address/address-form";
import { addressService } from "@/services/address.service";
import { useAddress } from "@/hooks/use-address";

import type {
  Address,
  CreateAddressPayload,
} from "@/types/address.types";

export default function EditAddressScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { updateAddress } = useAddress();

  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAddress = async () => {
      if (!id) return;

      try {
        const data = await addressService.getAddressById(id);
        setAddress(data);
      } catch (error) {
        Alert.alert(
          "Error",
          error instanceof Error
            ? error.message
            : "Failed to load address"
        );
      } finally {
        setLoading(false);
      }
    };

    loadAddress();
  }, [id]);

  const handleSubmit = async (payload: CreateAddressPayload) => {
    if (!id) return;

    await updateAddress(id, payload);
    router.back();
  };

  if (loading || !address) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Edit Address" }} />

      <AddressForm
        submitLabel="Update Address"
        initialValues={address}
        onSubmit={handleSubmit}
      />
    </>
  );
}