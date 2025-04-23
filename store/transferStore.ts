import { create, StateCreator } from 'zustand';

interface TransferState {
  // Step 1: Country Selection
  countryId: string | null;
  countryName: string | null;

  // Step 2: Receiver Details
  receiverName: string;
  bankName: string;
  swiftCode: string;
  iban: string;
  receiverAccount: string;

  // Step 3: Amount & Details
  amount: string; // Store as string for input flexibility
  currency: string; // e.g., 'EUR', 'USD'
  itemDescription: string;

  // Actions
  setCountry: (id: string, name: string) => void;
  setReceiverDetails: (details: {
    receiverName: string;
    bankName: string;
    swiftCode: string;
    iban: string;
    receiverAccount: string;
  }) => void;
  setAmountDetails: (details: {
    amount: string;
    currency: string;
    itemDescription: string;
  }) => void;
  resetTransfer: () => void; // Action to reset the state
}

// Define the type for the state creator
type TransferStoreCreator = StateCreator<TransferState>;

const storeCreator: TransferStoreCreator = (set) => ({
  // Initial State
  countryId: null,
  countryName: null,
  receiverName: '',
  bankName: '',
  swiftCode: '',
  iban: '',
  amount: '',
  currency: 'EUR', // Default currency, adjust as needed
  itemDescription: '',
  receiverAccount: '',
  // Actions Implementation
  setCountry: (id: string, name: string) => set({ countryId: id, countryName: name }),
  setReceiverDetails: (details: {
    receiverName: string;
    bankName: string;
    swiftCode: string;
    iban: string;
    receiverAccount: string;
  }) => set({
    receiverName: details.receiverName,
    bankName: details.bankName,
    swiftCode: details.swiftCode,
    iban: details.iban,
    receiverAccount: details.receiverAccount,
  }),
  setAmountDetails: (details: {
    amount: string;
    currency: string;
    itemDescription: string;
  }) => set({
    amount: details.amount,
    currency: details.currency,
    itemDescription: details.itemDescription,
  }),
  resetTransfer: () => set({
    countryId: null,
    countryName: null,
    receiverName: '',
    bankName: '',
    swiftCode: '',
    iban: '',
    amount: '',
    currency: 'EUR', // Reset to default
    itemDescription: '',
    receiverAccount: '',
  }),
});

const useTransferStore = create<TransferState>(storeCreator);

export default useTransferStore; 