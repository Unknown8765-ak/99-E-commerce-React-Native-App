import { Stack, router } from "expo-router";

import AddressForm from "@/components/address/address-form";
import { useAddress } from "@/hooks/use-address";

export default function AddAddressScreen() {
  const { createAddress } = useAddress();

  const handleSubmit = async (payload: any) => {
    await createAddress(payload);
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: "Add Address" }} />

      <AddressForm
        submitLabel="Save Address"
        onSubmit={handleSubmit}
      />
    </>
  );
}