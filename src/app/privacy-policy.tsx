import { ScrollView, StyleSheet, Text } from "react-native";
import { Stack } from "expo-router";
import LegalSection from "@/components/legal-section/legal-section";

export default function PrivacyPolicyScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Privacy Policy" }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.heading}>Privacy Policy</Text>

        <Text style={styles.updated}>Last updated: September 2026</Text>

        <Text style={styles.introduction}>
          Welcome to 99. We respect your privacy and are committed to
          protecting your personal information.
        </Text>

        <LegalSection
          title="1. Information We Collect"
          content="We may collect information such as your name, email address, phone number, delivery address, and order details when you use our application."
        />

        <LegalSection
          title="2. How We Use Your Information"
          content="Your information may be used to process orders, deliver products, provide customer support, improve our services, and communicate important account updates."
        />

        <LegalSection
          title="3. Account Information"
          content="You are responsible for keeping your account credentials confidential. Please contact us if you notice any unauthorized activity."
        />

        <LegalSection
          title="4. Payment Information"
          content="Payment processing may be handled by third-party payment providers. We do not intentionally store sensitive payment credentials such as card details on our servers."
        />

        <LegalSection
          title="5. Data Sharing"
          content="We may share necessary information with delivery partners, payment providers, and service providers to fulfill your orders and operate our services."
        />

        <LegalSection
          title="6. Data Security"
          content="We use reasonable security measures to protect your information. However, no online transmission or storage system can be guaranteed to be completely secure."
        />

        <LegalSection
          title="7. Your Rights"
          content="Depending on applicable law, you may have rights to access, update, or request deletion of your personal information. Contact our support team for assistance."
        />

        <LegalSection
          title="8. Policy Updates"
          content="We may update this Privacy Policy from time to time. Any changes will be reflected on this screen with an updated revision date."
        />

        <LegalSection
          title="9. Contact Us"
          content="If you have questions about this Privacy Policy, please contact our support team through the Contact Us section."
        />

        <Text style={styles.footer}>
          This is a preliminary policy. Obtain a legal review before
          publishing your production application.
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 27,
    fontWeight: "700",
    color: "#111827",
  },
  updated: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 6,
    marginBottom: 22,
  },
  introduction: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5563",
    marginBottom: 24,
  },
  footer: {
    fontSize: 12,
    lineHeight: 18,
    color: "#9CA3AF",
    marginTop: 8,
  },
});