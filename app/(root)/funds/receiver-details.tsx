import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, FONTS, SIZES } from "@/constants/theme";
import useTransferStore from "@/store/transferStore";

import Button from "@/components/button/button";
import FormField from "@/components/form/form-field";
import StatusModal from "@/components/modals/status-modal";
import AppHeader from "@/components/nav/app-header";
import { useModalStore } from "@/store/modalStore";
import { AMOUNT_URL } from "@/config/routes";

export default function ReceiverDetailsScreen() {
  const router = useRouter();
  const { showModal, hideModal, ...modalState } = useModalStore();

  const countryName = useTransferStore((state) => state.countryName);
  const setReceiverDetails = useTransferStore(
    (state) => state.setReceiverDetails
  );

  const [form, setForm] = useState({
    receiverName: "",
    receiverAccount: "",
    bankName: "",
    swiftCode: "",
    iban: "",
  });

  const submit = () => {
    const { receiverName, bankName, swiftCode, iban } = form;
    if (!receiverName || !bankName || !swiftCode || !iban) {
      showModal("error", "Please fill in all required fields");
      return;
    }
    setReceiverDetails(form);
    router.push(AMOUNT_URL);
  };

  useEffect(() => {
    hideModal();
  }, []);

  return (
    <>
      <AppHeader title={`Transfer to ${countryName}`} />
      <SafeAreaView
        style={styles.container}
        edges={["bottom", "left", "right"]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Enter Receiver Details</Text>

          <FormField
            title="Receiver Name"
            value={form.receiverName}
            handleChangeText={(e) => setForm({ ...form, receiverName: e })}
            placeholder="Enter full name"
          />
          <FormField
            title="Receive Account Number"
            value={form.receiverAccount}
            handleChangeText={(e) => setForm({ ...form, receiverAccount: e })}
            placeholder="Enter receive account number"
            keyboardType="numeric"
          />
          <FormField
            title="Bank Name"
            value={form.bankName}
            handleChangeText={(e) => setForm({ ...form, bankName: e })}
            placeholder="Enter bank name"
          />
          <FormField
            title="SWIFT/BIC Code"
            value={form.swiftCode}
            handleChangeText={(e) => setForm({ ...form, swiftCode: e })}
            placeholder="Enter SWIFT or BIC code"
            autoCapitalize="characters"
          />
          <FormField
            title="IBAN"
            value={form.iban}
            handleChangeText={(e) => setForm({ ...form, iban: e })}
            placeholder="Enter International Bank Account Number"
            autoCapitalize="characters"
          />

          <Button title="Continue" onPress={submit} />
        </ScrollView>
      </SafeAreaView>
      <StatusModal
        visible={modalState.visible}
        type={modalState.type}
        message={modalState.message}
        onClose={hideModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  scrollContainer: {
    padding: SIZES.base * 2,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.darkGrey,
    marginBottom: SIZES.base * 2,
  },
});
