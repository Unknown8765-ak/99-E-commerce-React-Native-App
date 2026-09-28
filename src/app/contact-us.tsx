import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";

import { sendContactMessage } from "@/services/support.service";

const SUPPORT_EMAIL = "support@example.com";
const SUPPORT_PHONE = "+919999999999";

export default function ContactUsScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await sendContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      if (response.success) {
        Alert.alert(
          "Message Sent",
          "Thank you! Your message has been sent successfully."
        );

        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      console.error("Contact form error:", error);

      Alert.alert(
        "Failed to Send",
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:${SUPPORT_PHONE}`).catch(() => {
      Alert.alert("Error", "Unable to open phone dialer.");
    });
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${SUPPORT_EMAIL}`).catch(() => {
      Alert.alert(
        "Unable to Open Email",
        `Please email us directly at ${SUPPORT_EMAIL}`
      );
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: "Contact Us" }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Get in Touch 📞</Text>

        <Text style={styles.subtitle}>
          Have a question or facing an issue? We are here to help.
        </Text>

       

        {/* Contact Form */}
        <Text style={styles.sectionTitle}>Send Us a Message</Text>

        <View style={styles.formCard}>
          {/* Name */}
          <Text style={styles.inputLabel}>Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />

          {/* Email */}
          <Text style={styles.inputLabel}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          {/* Phone */}
          <Text style={styles.inputLabel}>Phone</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {/* Subject */}
          <Text style={styles.inputLabel}>Subject</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter subject"
            placeholderTextColor="#9CA3AF"
            value={subject}
            onChangeText={setSubject}
          />

          {/* Message */}
          <Text style={styles.inputLabel}>Message</Text>

          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Describe your issue..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />

          {/* Submit */}
          <Pressable
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#FFFFFF" />

                <Text style={styles.submitButtonText}>Sending...</Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>Send Message</Text>
            )}
          </Pressable>

          <Text style={styles.note}>
            We will get back to you as soon as possible.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "#F2F6FF",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 21,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 7,
    marginTop: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },

  messageInput: {
    minHeight: 120,
  },

  submitButton: {
    marginTop: 20,
    backgroundColor: "#111827",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  disabledButton: {
    opacity: 0.7,
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  note: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
  },
});
