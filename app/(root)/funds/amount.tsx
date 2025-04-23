import Button from '@/components/common/button';
import FormField from '@/components/common/form-field';
import Header from '@/components/common/header';
import StatusModal from '@/components/common/modal';
import icons from '@/constants/icons';
import usePostIntlTransaction from '@/hooks/mutation/usePostIntlTransaction';
import { useModalStore } from "@/store/modalStore";
import useTransferStore from '@/store/transferStore';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define state type for selectors
interface TransferState {
  countryName: string | null;
  currency: string;
  amount: string;
  itemDescription: string;
  setAmountDetails: (details: {
    amount: string;
    currency: string;
    itemDescription: string;
  }) => void;
  // Add country flag if available in store
  // countryFlag: any; 
}

export default function AmountScreen() {
  const router = useRouter();
  const { user } = useUserStore()
  // Get state and actions from Zustand individually
  const countryName = useTransferStore((state: TransferState) => state.countryName);
  const currency = useTransferStore((state: TransferState) => state.currency);
  const amount = useTransferStore((state: TransferState) => state.amount);
  const itemDescription = useTransferStore((state: TransferState) => state.itemDescription);
  const setAmountDetails = useTransferStore((state: TransferState) => state.setAmountDetails);
  const { showModal } = useModalStore();

  const { isPending, handlePostIntlTransaction } = usePostIntlTransaction();

  // Handler to update store for currency (placeholder)
  const handleCurrencyChange = (newCurrency: string) => {
    // Convert currency name to code if needed
    const currencyCode = newCurrency === 'Dollar' ? 'USD' : newCurrency;
    // Pass the current amount and itemDescription when updating currency
    setAmountDetails({ amount, currency: currencyCode, itemDescription });
  };

  const submit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      showModal('error', 'Please enter a valid amount');
      return;
    }
    if (!currency) {
      showModal('error', 'Please select a currency');
      return;
    }

    // 1. Get all required data from Zustand store
    const transferData = useTransferStore.getState();

    // 2. Prepare the payload
    const payload = {
      senderAccount: user?.accounts[0].accountNumber ?? '',
      senderName: "self",
      receiverAccount: transferData.receiverAccount,
      receiverBankName: transferData.bankName,
      receiverBankSwiftCode: transferData.swiftCode,
      receiverName: transferData.receiverName,
      receiverCountry: transferData.countryName || 'N/A',
      currency: transferData.currency === 'Dollar' ? 'USD' : transferData.currency,
      amount: parseFloat(transferData.amount),
    };

    try {
      showModal('loading', 'Processing transaction...');
      await handlePostIntlTransaction(payload);
    } catch (error) {
      showModal('error');
    }
  };

  return (
    <React.Fragment>
      <Header
        title="Amount"
        showBackArrow={true}
        backArrowIcon={icons.back}
        titleAlignment="center"
      />
      <SafeAreaView className="flex-1 bg-white" edges={['bottom', 'left', 'right']}>
        <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>

          {/* Source Account Section */}
          <View className="mb-6">
            <Text className="text-sm text-gray-500 mb-1">Source account</Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-base font-semibold text-gray-800">Main Account (IBAN)</Text>
              <TouchableOpacity onPress={() => { /* TODO: Handle Change Source Account */ }}>
                <Text className="text-sm text-red-600 font-medium">Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Destination Country Section */}
          <View className="mb-6">
            <Text className="text-sm text-gray-500 mb-2">Destination country</Text>
            <View className="flex-row justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <View className="flex-row items-center gap-3">
                {/* TODO: Add Country Flag Image based on store/props */}
                <View className="w-6 h-6 rounded-full bg-gray-300"></View>
                <Text className="text-base font-medium text-gray-800">{countryName || 'N/A'}</Text>
              </View>
              <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-1">
                <Text className="text-sm text-blue-600 font-medium">Change country</Text>
                <Image source={icons.arrowDown} className="w-3 h-3" resizeMode="contain" tintColor="#2563EB" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Amount & Currency Section */}
          <View className="flex-row mb-4 gap-3">
            <View className="flex-1">
              <FormField
                title="Amount you are sending"
                value={amount}
                handleChangeText={(newAmount) =>
                  setAmountDetails({ amount: newAmount, currency, itemDescription })
                }
                placeholder='0.00'
                keyboardType='decimal-pad'
              />
            </View>
            <View className="w-28">
              <Text className="text-base text-gray-600 font-medium mb-2">Currency</Text>

              <TouchableOpacity
                onPress={() => handleCurrencyChange(currency === 'EUR' ? 'USD' : 'EUR')}
                className="border-2 border-gray-200 h-16 px-4 bg-gray-100 rounded-2xl items-center flex-row justify-between"
              >
                <Text className="text-black font-semibold text-base">{currency}</Text>
                <Image source={icons.arrowDown} className="w-4 h-4" resizeMode="contain" tintColor="#888" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Item (Optional) Section */}
          <View className="mb-6">
            <FormField
              title="Item (optional)"
              value={itemDescription}
              handleChangeText={(newItemDesc) =>
                setAmountDetails({ amount, currency, itemDescription: newItemDesc })
              }
              placeholder='Write the item here'
              maxLength={140}
            />
            <Text className="text-xs text-gray-500">* Characters permitted: A-Z, a-z, 0-9, @, ./, ?</Text>
            <Text className="text-xs text-gray-500 text-right">{itemDescription.length}/140</Text>
          </View>

        </ScrollView>

        <View className="px-4">
          <Button
            onPress={submit}
            className="bg-red-500 rounded-full py-4 mb-4 text-white p-4"
            disabled={isPending}
            loading={isPending}
            loadingText="Processing..."
          >
            <Text className="text-white font-medium text-md text-center">
              Send Money
            </Text>
          </Button>
        </View>
      </SafeAreaView>
      <StatusModal
        visible={useModalStore.getState().visible}
        type={useModalStore.getState().type}
        message={useModalStore.getState().message}
        onClose={useModalStore.getState().hideModal}
      />
    </React.Fragment>
  );
} 