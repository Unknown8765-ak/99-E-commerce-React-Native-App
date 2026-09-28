import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";

import type {
  AddressType,
  CreateAddressPayload,
} from "@/types/address.types";

interface AddressFormProps {
  initialValues?: Partial<CreateAddressPayload>;
  submitLabel: string;
  onSubmit: (payload: CreateAddressPayload) => Promise<void>;
}

export default function AddressForm({
  initialValues,
  submitLabel,
  onSubmit,
}: AddressFormProps) {
  const [fullName, setFullName] = useState(initialValues?.fullName ?? "");
  const [phone, setPhone] = useState(initialValues?.phone ?? "");
  const [addressLine1, setAddressLine1] = useState(
    initialValues?.addressLine1 ?? ""
  );
  const [addressLine2, setAddressLine2] = useState(
    initialValues?.addressLine2 ?? ""
  );
  const [landmark, setLandmark] = useState(initialValues?.landmark ?? "");
  const [city, setCity] = useState(initialValues?.city ?? "");
  const [state, setState] = useState(initialValues?.state ?? "");
  const [postalCode, setPostalCode] = useState(
    initialValues?.postalCode ?? ""
  );
  const [country, setCountry] = useState(
    initialValues?.country ?? "India"
  );
  const [type, setType] = useState<AddressType>(
    initialValues?.type ?? "home"
  );
  const [isDefault, setIsDefault] = useState(
    initialValues?.isDefault ?? false
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !addressLine1.trim() ||
      !city.trim() ||
      !state.trim() ||
      !postalCode.trim() ||
      !country.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await onSubmit({
        fullName: fullName.trim(),
        phone: phone.trim(),
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2.trim() || undefined,
        landmark: landmark.trim() || undefined,
        city: city.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
        type,
        isDefault,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    placeholder: string,
    value: string,
    setter: (value: string) => void,
    required = false
  ) => (
    <TextInput
      style={styles.input}
      placeholder={`${placeholder}${required ? " *" : ""}`}
      value={value}
      onChangeText={setter}
    />
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {renderInput("Full Name", fullName, setFullName, true)}

      {renderInput("Phone", phone, setPhone, true)}

      {renderInput(
        "Address Line 1",
        addressLine1,
        setAddressLine1,
        true
      )}

      {renderInput("Address Line 2", addressLine2, setAddressLine2)}

      {renderInput("Landmark", landmark, setLandmark)}

      {renderInput("City", city, setCity, true)}

      {renderInput("State", state, setState, true)}

      {renderInput("Postal Code", postalCode, setPostalCode, true)}

      {renderInput("Country", country, setCountry, true)}

      <Text style={styles.label}>Address Type</Text>

      <View style={styles.typeContainer}>
        {(["home", "work", "other"] as AddressType[]).map(
          (addressType) => (
            <Pressable
              key={addressType}
              style={[
                styles.typeButton,
                type === addressType && styles.selectedType,
              ]}
              onPress={() => setType(addressType)}
            >
              <Text
                style={[
                  styles.typeText,
                  type === addressType && styles.selectedTypeText,
                ]}
              >
                {addressType.toUpperCase()}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <Pressable
        style={styles.defaultContainer}
        onPress={() => setIsDefault((previous) => !previous)}
      >
        <Text style={styles.checkbox}>
          {isDefault ? "☑" : "☐"}
        </Text>

        <Text>Set as default address</Text>
      </Pressable>

      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable
        style={[styles.submitButton, loading && styles.disabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitText}>
          {loading ? "Saving..." : submitLabel}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
     backgroundColor: "#F2F6FF",
  },
  input: {
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  label: {
    marginTop: 8,
    marginBottom: 10,
    fontWeight: "700",
  },
  typeContainer: {
    flexDirection: "row",
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedType: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  selectedTypeText: {
    color: "#fff",
  },
  defaultContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 20,
  },
  checkbox: {
    fontSize: 22,
  },
  error: {
    marginBottom: 12,
    color: "#dc2626",
  },
  submitButton: {
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#111",
  },
  disabled: {
    opacity: 0.5,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
  },
});