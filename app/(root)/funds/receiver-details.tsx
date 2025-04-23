import Button from '@/components/common/button';
import FormField from '@/components/common/form-field';
import Header from '@/components/common/header';
import icons from '@/constants/icons';
import useTransferStore from '@/store/transferStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Get the state type from the store file if possible, or redefine here
interface TransferState {
  setCountry: (id: string, name: string) => void;
  setReceiverDetails: (details: { receiverName: string; bankName: string; swiftCode: string; iban: string; receiverAccount: string; }) => void;

}

export default function ReceiverDetailsScreen() {
  const router = useRouter();
  const { countryId, countryName } = useLocalSearchParams(); // Get passed params
  const decodedCountryName = countryName ? decodeURIComponent(countryName as string) : 'Selected Country';

  // Get setter function from Zustand store with explicit state type
  const setReceiverDetails = useTransferStore((state: TransferState) => state.setReceiverDetails);
  const setCountry = useTransferStore((state: TransferState) => state.setCountry);

  const [form, setForm] = useState({
    receiverName: '',
    receiverAccount: '',
    bankName: '',
    swiftCode: '',
    iban: '',
  });

  // Set country in store when component mounts or params change
  useEffect(() => {
    if (countryId && countryName) {
      setCountry(countryId as string, decodedCountryName);
    }
  }, [countryId, countryName, decodedCountryName, setCountry]);

  const submit = () => {
    if (!form.receiverName || !form.bankName || !form.swiftCode || !form.iban) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setReceiverDetails({
      receiverName: form.receiverName,
      bankName: form.bankName,
      swiftCode: form.swiftCode,
      iban: form.iban,
      receiverAccount: form.receiverAccount,
    });

    // Navigate to the amount screen
    router.push('/funds/amount');
  };

  return (
    <React.Fragment>
      <Header
        title={`Transfer to ${decodedCountryName}`}
        showBackArrow={true}
        backArrowIcon={icons.back}
        titleAlignment="center"
      />
      <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom', 'left', 'right']}>
        <ScrollView className="flex-1 px-4 py-6">
          <Text className="text-lg font-semibold mb-6 text-gray-700">
            Enter Receiver Details
          </Text>

          <FormField
            title="Receiver Name"
            value={form.receiverName}
            handleChangeText={(e: string) => setForm({ ...form, receiverName: e })}
            placeholder='Enter full name'
          />

          <FormField
            title="Receive Account Number"
            value={form.receiverAccount}
            handleChangeText={(e: string) => setForm({ ...form, receiverAccount: e })}
            placeholder="Enter receive account number"
          />

          <FormField
            title="Bank Name"
            value={form.bankName}
            handleChangeText={(e: string) => setForm({ ...form, bankName: e })}
            placeholder='Enter bank name'
          />

          <FormField
            title="SWIFT/BIC Code"
            value={form.swiftCode}
            handleChangeText={(e: string) => setForm({ ...form, swiftCode: e })}
            placeholder='Enter SWIFT or BIC code'
          />

          <FormField
            title="IBAN"
            value={form.iban}
            handleChangeText={(e: string) => setForm({ ...form, iban: e })}
            placeholder='Enter International Bank Account Number'
          />

          <Button
            className="bg-red-500 rounded-full py-4 mb-4"
            onPress={submit}
          >
            <Text className="text-center text-white font-medium">
              Continue
            </Text>
          </Button>

        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
} 