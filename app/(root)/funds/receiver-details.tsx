import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, FONTS, SIZES } from "@/constants/theme";
import useTransferStore from "@/store/transferStore";

import Button from "@/components/button/button";
import FormField from "@/components/form/form-field";
import SelectInput from "@/components/form/select-input";
import StatusModal from "@/components/modals/status-modal";
import AppHeader from "@/components/nav/app-header";
import { AMOUNT_URL } from "@/config/routes";
import { Bank, useBankList } from "@/hooks/query/useBankList";
import { useModalStore } from "@/store/modalStore";

interface SelectItem {
  label: string;
  value: string;
  data: Bank;
}

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

  const { countries, isLoading, error } = useBankList();
  const selectedCountry = countries.find(
    (country) => country.country === countryName
  );
  const banks = selectedCountry?.banks || [];

  useEffect(() => {
    if (error) {
      showModal("error", "Failed to load bank information");
    }
  }, [error]);

  const handleBankSelect = (item: SelectItem) => {
    setForm({
      ...form,
      bankName: item.data.bankName,
      swiftCode: item.data.swiftCode,
    });
  };

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
            title="Receiver Full Name"
            value={form.receiverName}
            handleChangeText={(e) => setForm({ ...form, receiverName: e })}
            placeholder="Enter full name"
          />
          <FormField
            title="Receiver Account Number"
            value={form.receiverAccount}
            handleChangeText={(e) => setForm({ ...form, receiverAccount: e })}
            placeholder="Enter account number"
            keyboardType="numeric"
          />
          <SelectInput
            title="Bank Name"
            value={form.bankName}
            items={banks.map((bank) => ({
              label: bank.bankName,
              value: bank.bankName,
              data: bank,
            }))}
            onSelect={handleBankSelect}
            placeholder="Select bank"
            isLoading={isLoading}
          />
          <FormField
            title="SWIFT/BIC Code"
            value={form.swiftCode}
            handleChangeText={(e) => setForm({ ...form, swiftCode: e })}
            placeholder="Enter SWIFT or BIC code"
            autoCapitalize="characters"
            editable={false}
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
