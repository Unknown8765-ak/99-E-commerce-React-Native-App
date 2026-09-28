import { useCallback, useState } from "react";

import { addressService } from "@/services/address.service";

import type {
  Address,
  CreateAddressPayload,
  UpdateAddressPayload,
} from "@/types/address.types";

export const useAddress = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAddresses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await addressService.getAddresses();

      setAddresses(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load addresses";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAddress = async (payload: CreateAddressPayload) => {
    const newAddress = await addressService.createAddress(payload);

    setAddresses((previous) => {
      if (newAddress.isDefault) {
        return [
          ...previous.map((address) => ({
            ...address,
            isDefault: false,
          })),
          newAddress,
        ];
      }

      return [...previous, newAddress];
    });

    return newAddress;
  };

  const updateAddress = async (
    addressId: string,
    payload: UpdateAddressPayload
  ) => {
    const updatedAddress = await addressService.updateAddress(
      addressId,
      payload
    );

    setAddresses((previous) =>
      previous.map((address) =>
        address._id === addressId ? updatedAddress : address
      )
    );

    return updatedAddress;
  };

  const deleteAddress = async (addressId: string) => {
    await addressService.deleteAddress(addressId);

    setAddresses((previous) =>
      previous.filter((address) => address._id !== addressId)
    );
  };

  const setDefaultAddress = async (addressId: string) => {
    const updatedAddress = await addressService.setDefaultAddress(addressId);

    setAddresses((previous) =>
      previous.map((address) => ({
        ...address,
        isDefault: address._id === updatedAddress._id,
      }))
    );

    return updatedAddress;
  };

  return {
    addresses,
    loading,
    error,
    loadAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
};