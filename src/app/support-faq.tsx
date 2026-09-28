import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How can I place an order?",
    answer:
      "Browse products, open a product, add it to your cart, select your delivery address, and place your order from checkout.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "Currently, Cash on Delivery is available. Online payment will be available soon.",
  },
  {
    question: "How can I cancel my order?",
    answer:
      "You can cancel eligible orders from the My Orders section before the order is delivered.",
  },
  {
    question: "How can I change my delivery address?",
    answer:
      "You can manage your saved delivery addresses from Profile → My Addresses.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Open My Orders and select your order to view its current status and order details.",
  },
  {
    question: "What should I do if I receive a damaged product?",
    answer:
      "Please contact our support team with your order details and a description of the issue.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Return availability depends on the product and order conditions. Contact support for assistance with your order.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact our support team from the Contact Us section available in your profile.",
  },
];

export default function SupportFAQScreen() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleFAQPress = (index: number) => {
    setExpandedIndex((previousIndex) =>
      previousIndex === index ? null : index
    );
  };

  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Intro */}
        <View style={styles.introCard}>
          <Text style={styles.introIcon}>❓</Text>

          <View style={styles.introContent}>
            <Text style={styles.introTitle}>
              How can we help?
            </Text>

            <Text style={styles.introText}>
              Find answers to common questions about your orders,
              payments and account.
            </Text>
          </View>
        </View>

        {/* FAQ */}
        <Text style={styles.sectionTitle}>
          Frequently Asked Questions
        </Text>

        <View style={styles.faqCard}>
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <View key={faq.question}>
                <Pressable
                  style={styles.questionRow}
                  onPress={() => handleFAQPress(index)}
                >
                  <Text style={styles.question}>
                    {faq.question}
                  </Text>

                  <Text style={styles.arrow}>
                    {isExpanded ? "−" : "+"}
                  </Text>
                </Pressable>

                {isExpanded && (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answer}>
                      {faq.answer}
                    </Text>
                  </View>
                )}

                {index !== faqs.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            );
          })}
        </View>

        {/* Contact Support */}
        <View style={styles.contactCard}>
          <Text style={styles.contactIcon}>💬</Text>

          <Text style={styles.contactTitle}>
            Still need help?
          </Text>

          <Text style={styles.contactText}>
            Our support team is here to help you with your
            questions and orders.
          </Text>

          <Pressable
            style={styles.contactButton}
            onPress={() => router.push("/contact-us")}
          >
            <Text style={styles.contactButtonText}>
              Contact Us
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F6FF",
  },


  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  backIcon: {
    fontSize: 32,
    color: "#111827",
    lineHeight: 34,
  },

  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },

  headerSpacer: {
    width: 40,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  introCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 24,
  },

  introIcon: {
    fontSize: 32,
    marginRight: 14,
  },

  introContent: {
    flex: 1,
  },

  introTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  introText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 20,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  faqCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  questionRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  question: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    paddingRight: 12,
  },

  arrow: {
    fontSize: 22,
    color: "#6B7280",
    width: 24,
    textAlign: "center",
  },

  answerContainer: {
    paddingBottom: 15,
    paddingRight: 30,
  },

  answer: {
    fontSize: 13,
    lineHeight: 20,
    color: "#6B7280",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  contactCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 20,
    alignItems: "center",
  },

  contactIcon: {
    fontSize: 30,
    marginBottom: 8,
  },

  contactTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  contactText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 16,
  },

  contactButton: {
    width: "100%",
    backgroundColor: "#111827",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },

  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});