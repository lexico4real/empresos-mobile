import { create, StateCreator } from "zustand";

export interface TransferState {
  countryId: string | null;
  countryName: string | null;
  receiverName: string;
  bankName: string;
  swiftCode: string;
  iban: string;
  receiverAccount: string;
  amount: string;
  currency: string;
  itemDescription: string;

  setCountry: (id: string, name: string) => void;
  setReceiverDetails: (details: {
    receiverName: string;
    bankName: string;
    swiftCode: string;
    iban: string;
    receiverAccount: string;
  }) => void;
  setAmount: (amount: string) => void;
  setCurrency: (currency: string) => void;
  setItemDescription: (itemDescription: string) => void;
  setAmountDetails: (details: {
    amount: string;
    currency: string;
    itemDescription: string;
  }) => void;
  resetTransfer: () => void;
}

type TransferStoreCreator = StateCreator<TransferState>;

const storeCreator: TransferStoreCreator = (set) => ({
  countryId: null,
  countryName: null,
  receiverName: "",
  bankName: "",
  swiftCode: "",
  iban: "",
  amount: "",
  currency: "EUR",
  itemDescription: "",
  receiverAccount: "",
  setCountry: (id: string, name: string) =>
    set({ countryId: id, countryName: name }),
  setReceiverDetails: (details) => set(details),
  setAmount: (amount: string) => set({ amount }),
  setCurrency: (currency: string) => set({ currency }),
  setItemDescription: (itemDescription: string) => set({ itemDescription }),
  setAmountDetails: (details) => set(details),
  resetTransfer: () =>
    set({
      countryId: null,
      countryName: null,
      receiverName: "",
      bankName: "",
      swiftCode: "",
      iban: "",
      amount: "",
      currency: "EUR",
      itemDescription: "",
      receiverAccount: "",
    }),
});

const useTransferStore = create<TransferState>(storeCreator);

export default useTransferStore;
