import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/button/button";
import FormField from "@/components/form/form-field";
import AppHeader from "@/components/nav/app-header";

import icons from "@/constants/icons";
import { COLORS, FONTS, SIZES } from "@/constants/theme";

import StatusModal from "@/components/modals/status-modal";
import usePostIntlTransaction from "@/hooks/mutation/usePostIntlTransaction";
import { useBankList } from "@/hooks/query/useBankList";
import { useModalStore } from "@/store/modalStore";
import useTransferStore from "@/store/transferStore";
import { useUserStore } from "@/store/userStore";

export default function AmountScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const { showModal, hideModal, ...modalState } = useModalStore();

  const countryName = useTransferStore((state) => state.countryName);
  const amount = useTransferStore((state) => state.amount);
  const currency = useTransferStore((state) => state.currency);
  const itemDescription = useTransferStore((state) => state.itemDescription);
  const setAmount = useTransferStore((state) => state.setAmount);
  const setCurrency = useTransferStore((state) => state.setCurrency);
  const setItemDescription = useTransferStore(
    (state) => state.setItemDescription
  );

  const { countries } = useBankList();
  const selectedCountry = countries.find(
    (country) => country.country === countryName
  );

  const { isPending, handlePostIntlTransaction } = usePostIntlTransaction();

  const handleCurrencyChange = (newCurrency: string) => {
    const currencyCode = newCurrency === "Dollar" ? "USD" : newCurrency;
    setCurrency(currencyCode);
  };

  const submit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      showModal("error", "Please enter a valid amount");
      return;
    }

    const transferData = useTransferStore.getState();

    const payload = {
      senderAccount: user?.accounts[0].accountNumber ?? "",
      senderName: "self",
      receiverAccount: transferData.receiverAccount,
      receiverBankName: transferData.bankName,
      receiverBankSwiftCode: transferData.swiftCode,
      receiverName: transferData.receiverName,
      receiverCountry: transferData.countryName || "N/A",
      currency:
        transferData.currency === "Dollar" ? "USD" : transferData.currency,
      amount: parseFloat(transferData.amount),
    };

    try {
      showModal("loading", "Processing transaction...");
      handlePostIntlTransaction(payload);
    } catch {
      showModal("error");
    }
  };

  useEffect(() => {
    hideModal();
  }, []);

  return (
    <>
      <AppHeader title="Amount" />
      <SafeAreaView
        style={styles.container}
        edges={["bottom", "left", "right"]}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Source Account */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Source account</Text>
            <View style={styles.row}>
              <Text style={styles.primaryText}>Main Account (IBAN)</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.changeButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Destination Country */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Destination country</Text>
            <View style={styles.destinationCard}>
              <View style={styles.row}>
                <View style={styles.flagContainer}>
                  <Image
                    source={
                      selectedCountry?.flag
                        ? { uri: selectedCountry.flag }
                        : icons.spainLogo
                    }
                    style={styles.flag}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.primaryText}>{countryName || "N/A"}</Text>
              </View>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.row}
              >
                <Text style={styles.changeCountryText}>Change country</Text>
                <Image
                  source={icons.arrowDown}
                  style={styles.icon}
                  tintColor={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Amount & Currency */}
          <View
            style={[
              styles.row,
              { gap: SIZES.base * 1.5, alignItems: "flex-start" },
            ]}
          >
            <View style={{ flex: 1 }}>
              <FormField
                title="Amount you are sending"
                value={amount}
                handleChangeText={setAmount}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />
            </View>
            <View style={{ width: 120 }}>
              <Text style={[styles.sectionLabel, { marginBottom: SIZES.base }]}>
                Currency
              </Text>
              <TouchableOpacity
                onPress={() =>
                  handleCurrencyChange(currency === "EUR" ? "USD" : "EUR")
                }
                style={styles.currencyPicker}
              >
                <Text style={styles.primaryText}>{currency}</Text>
                <Image
                  source={icons.arrowDown}
                  style={styles.icon}
                  tintColor={COLORS.grey}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Item Description */}
          <View style={styles.sectionContainer}>
            <FormField
              title="Item (optional)"
              value={itemDescription}
              handleChangeText={setItemDescription}
              placeholder="Write the item here"
              maxLength={140}
            />
            <Text style={styles.helperText}>
              * Characters permitted: A-Z, a-z, 0-9, @, ./, ?
            </Text>
            <Text style={[styles.helperText, { textAlign: "right" }]}>
              {itemDescription.length}/140
            </Text>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <Button
            title="Send Money"
            onPress={submit}
            disabled={isPending}
            loading={isPending}
            loadingText="Processing..."
          />
        </View>
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
  container: { flex: 1, backgroundColor: COLORS.white },
  scrollView: {
    flex: 1,
    paddingHorizontal: SIZES.base * 1.5,
    paddingTop: SIZES.base * 1.5,
  },
  sectionContainer: { marginBottom: SIZES.base * 1.5 },
  sectionLabel: {
    ...FONTS.body,
    color: COLORS.grey,
    marginBottom: SIZES.base / 2,
  },
  primaryText: { ...FONTS.h4, color: COLORS.secondary },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changeButtonText: { ...FONTS.body, fontWeight: "600", color: COLORS.primary },
  destinationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.base * 1.5,
    backgroundColor: COLORS.lightGrey,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
  },
  flagContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: SIZES.base,
  },
  flag: {
    width: "100%",
    height: "100%",
  },
  changeCountryText: {
    ...FONTS.body,
    fontWeight: "600",
    color: COLORS.primary,
    marginRight: SIZES.base / 2,
  },
  icon: { width: 14, height: 14 },
  currencyPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    borderRadius: SIZES.radius,
    height: 50,
    paddingHorizontal: SIZES.base * 2,
  },
  helperText: {
    ...FONTS.body,
    fontSize: 12,
    color: COLORS.grey,
    marginTop: SIZES.base / 2,
  },
  bottomContainer: {
    padding: SIZES.base * 1.5,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightBorder,
    backgroundColor: COLORS.white,
  },
});
