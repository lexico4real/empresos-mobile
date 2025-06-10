import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface TransactionHistoryResponse {
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    senderName: string;
    senderAccount: string;
    receiverName: string;
    receiverAccount: string;
    receiverBankName: string;
    receiverBankSwiftCode: string;
    receiverPhone: string | null;
    receiverCountry: string;
    amount: string;
    narration: string;
  }[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    currUrl: string;
    prevUrl: string | null;
    nextUrl: string | null;
  };
}

const useGetTransactionHistory = () => {
  const getTransactionHistory = async () => {
    const response = await api.get<TransactionHistoryResponse>(
      "/transaction/history/intl"
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactionHistory"],
    queryFn: getTransactionHistory,
  });

  return { data, isLoading, error };
};

export default useGetTransactionHistory;
