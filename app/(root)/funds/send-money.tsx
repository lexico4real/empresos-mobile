import FAQItem from "@/components/cards/faq-item";
import SendMoneyItem from "@/components/cards/send-money-item";
import AppHeader from "@/components/nav/app-header";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const sendingOptions = [
  {
    icon: "swap-horizontal-outline",
    title: "Transfers",
    subtitle: "National and international",
  },
  {
    icon: "card-outline",
    title: "Salary and pension payments",
    subtitle: "Immediate payment",
  },
  {
    icon: "calendar-outline",
    title: "Scheduled and periodic transfers",
    subtitle: "Schedule and manage your transfers",
  },
];

const faqData = [
  "How to make a periodic transfer?",
  "How to make a national transfer?",
  "How to make a deferred transfer?",
  "How to make a transfer?",
];

export default function SendingMoneyScreen() {
  return (
    <View style={styles.container}>
      <AppHeader title="Sending money" canGoBack={true} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.optionsListParentContainer}>
          <Text style={styles.sectionTitle}>All options</Text>
          {sendingOptions.map((item) => (
            <View key={item.title}>
              <SendMoneyItem
                icon={item.icon as keyof typeof Ionicons.glyphMap}
                title={item.title}
                subtitle={item.subtitle}
                onPress={() => console.log(`Pressed ${item.title}`)}
              />
            </View>
          ))}
        </View>

        <View style={styles.faqCard}>
          {/* Dark Header */}
          <View style={styles.faqHeader}>
            <Text style={styles.faqTitle}>Do you have any doubt?</Text>
          </View>

          {/* White Body */}
          <View style={styles.faqBody}>
            {faqData.map((question, index) => (
              <View key={question}>
                <FAQItem question={question} />
                {index < faqData.length - 1 && (
                  <View style={styles.faqDivider} />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  optionsListParentContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#43474A",
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  faqCard: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  faqHeader: {
    backgroundColor: "#004D40",
    padding: 20,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  faqBody: {
  },
  faqDivider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginLeft: 20,
    marginRight: 20,
  },
});
