import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface TransactionTotal {
  month: string;
  total: number;
}

const useGetTransactionTotal = () => {
  const getTransactionTotal = async () => {
    const response = await api.get<TransactionTotal[]>(
      "/transaction/intl-transaction/total"
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactionTotal"],
    queryFn: getTransactionTotal,
  });

  return { data, isLoading, error };
};

export default useGetTransactionTotal;
