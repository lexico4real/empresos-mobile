import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ImageSourcePropType } from "react-native";

export const useBankList = () => {
  const getBankList = async () => {
    const response = await api.get<Country[]>("/transaction/bank/list");
    return response.data;
  };

  const {
    data: countries = [],
    isLoading,
    error,
  } = useQuery<Country[]>({
    queryKey: ["bankList"],
    queryFn: getBankList,
  });

  return { countries, isLoading, error };
};

export interface Bank {
  bankName: string;
  swiftCode: string;
}

export interface Country {
  country: string;
  flag: string;
  currency: string;
  currencyCode: string;
  currencySymbol: string;
  banks: Bank[];
}

export interface CountryListItem {
  id: string;
  name: string;
  flag: ImageSourcePropType;
  currency?: string;
  currencyCode?: string;
  currencySymbol?: string;
  banks?: Bank[];
}
