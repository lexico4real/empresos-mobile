import RecipientCard from "@/components/cards/recipient-card";
import SendMoneyItem from "@/components/cards/send-money-item";
import AppHeader from "@/components/nav/app-header";
import { AMOUNT_URL, TRANSFER_OPTIONS_URL } from "@/config/routes";
import useGetTransactionHistory from "@/hooks/query/useGetTransactionHistory";
import useTransferStore from "@/store/transferStore";
import { getColorFromName, getInitials } from "@/utils/recipient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { sendingOptions } from "./transfer-options";

export default function SendMoneyScreen() {
  const { data: transactionData, isLoading } = useGetTransactionHistory();
  const setReceiverDetails = useTransferStore(
    (state) => state.setReceiverDetails
  );
  const setCountry = useTransferStore((state) => state.setCountry);

  const recipients = useMemo(() => {
    if (!transactionData?.data) return [];

    // Create a map to store unique recipients
    const uniqueRecipients = new Map();

    transactionData.data.forEach((transaction) => {
      const key = `${transaction.receiverName}-${transaction.receiverAccount}`;
      if (!uniqueRecipients.has(key)) {
        uniqueRecipients.set(key, {
          initials: getInitials(transaction.receiverName),
          name: transaction.receiverName,
          accountNumber: transaction.receiverAccount,
          bgColor: getColorFromName(transaction.receiverName),
          bankName: transaction.receiverBankName,
          swiftCode: transaction.receiverBankSwiftCode,
          country: transaction.receiverCountry,
        });
      }
    });

    return Array.from(uniqueRecipients.values());
  }, [transactionData]);

  const handleRecipientSelect = (recipient: any) => {
    // Log recipient country
    console.log("Selected recipient.country:", recipient.country);
    // Set receiver details in the transfer store
    setReceiverDetails({
      receiverName: recipient.name,
      receiverAccount: recipient.accountNumber,
      bankName: recipient.bankName,
      swiftCode: recipient.swiftCode,
      iban: "", // We don't have IBAN in the transaction history
    });

    // Set country details
    setCountry(recipient.country, recipient.country);
    // Log store value after setting
    setTimeout(() => {
      const transferStore = require("@/store/transferStore").default;
      console.log(
        "countryName in store after setCountry:",
        transferStore.getState().countryName
      );
      // Navigate directly to amount screen since we have all the details
      router.push(AMOUNT_URL);
    }, 100);
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Sending money" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- "Send to..." Horizontal Scroll Section --- */}
        <View style={styles.sendToContainer}>
          <Text style={styles.sectionTitle}>Send to...</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {/* New Transfer Card */}
            <TouchableOpacity
              style={styles.newTransferCard}
              onPress={() => router.push(TRANSFER_OPTIONS_URL)}
            >
              <View style={styles.plusIconCircle}>
                <Ionicons name="add" size={32} color="#E30600" />
              </View>
              <Text style={[styles.newTransferTitle, { textAlign: "center" }]}>
                New transfer
              </Text>
              <Text
                style={[
                  styles.newTransferSubtitle,
                  { textAlign: "center", paddingHorizontal: 8 },
                ]}
              >
                Transfers, transfers between accounts, salary payments
              </Text>
            </TouchableOpacity>

            {/* Recipient Cards */}
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text>Loading recipients...</Text>
              </View>
            ) : (
              recipients.map((recipient) => (
                <RecipientCard
                  key={recipient.accountNumber}
                  {...recipient}
                  onPress={() => handleRecipientSelect(recipient)}
                />
              ))
            )}
          </ScrollView>
        </View>

        {/* --- Empty State Section --- */}
        {!isLoading && recipients.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateTitle}>This is very empty</Text>
            <Text style={styles.emptyStateSubtitle}>
              You still have no money transfers in this account
            </Text>
          </View>
        )}

        {/* --- "All options" Reusable Section --- */}
        <View style={styles.optionsListParentContainer}>
          <Text style={styles.sectionTitle}>All options</Text>
          {sendingOptions.map((item) => (
            <View key={item.title}>
              <SendMoneyItem
                icon={item.icon as keyof typeof Ionicons.glyphMap}
                title={item.title}
                subtitle={item.subtitle}
                onPress={() => router.push(item.route)}
              />
            </View>
          ))}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#43474A",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  // --- Send To Section ---
  sendToContainer: {
    backgroundColor: "#f8f9fa",
    paddingTop: 20,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  horizontalScroll: {
    paddingHorizontal: 15,
  },
  newTransferCard: {
    width: 180,
    height: 130,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginRight: 12,
  },
  plusIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FEEEEE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    alignSelf: "center",
  },
  newTransferTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#26303A",
  },
  newTransferSubtitle: {
    fontSize: 10,
    fontWeight: "400",
    color: "#6c757d",
    marginTop: 2,
    lineHeight: 12,
  },
  // --- Empty State Section ---
  emptyStateContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#26303A",
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6c757d",
    textAlign: "center",
  },
  // --- Loading State ---
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  // --- All Options Section ---
  allOptionsContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  optionsListParentContainer: {
    padding: 15,
    flex: 1,
  },
});
