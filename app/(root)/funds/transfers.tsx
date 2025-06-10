import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CountryCard from "@/components/cards/country-card";
import CountryListItem from "@/components/cards/country-list-item";
import SearchInput from "@/components/form/search-input";
import AppHeader from "@/components/nav/app-header";
import icons from "@/constants/icons";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import {
  CountryListItem as CountryListItemType,
  useBankList,
} from "@/hooks/query/useBankList";
import useTransferStore from "@/store/transferStore";

const commonCountries: CountryListItemType[] = [
  { id: "es", name: "Spain", flag: icons.spainLogo },
  { id: "us", name: "United States", flag: icons.usaLogo },
  { id: "fr", name: "France", flag: icons.franceLogo },
];

export default function TransfersScreen() {
  const router = useRouter();
  const [selectedCommonCountry, setSelectedCommonCountry] = useState<
    string | null
  >("es");
  const [searchQuery, setSearchQuery] = useState("");
  const { countries, isLoading, error } = useBankList();

  const setCountry = useTransferStore((state) => state.setCountry);

  const handleCountrySelect = (country: CountryListItemType) => {
    setCountry(country.id, country.name);
    router.push("/funds/receiver-details");
  };

  const formattedCountries: CountryListItemType[] = countries.map(
    (country) => ({
      id: country.country.toLowerCase().replace(/\s+/g, "-"),
      name: country.country,
      flag: { uri: country.flag },
      currency: country.currency,
      currencyCode: country.currencyCode,
      currencySymbol: country.currencySymbol,
      banks: country.banks,
    })
  );

  const filteredCountries = formattedCountries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderListHeader = () => (
    <>
      <View style={styles.commonCountriesSection}>
        <Text style={styles.subtitle}>Most common countries</Text>
        <FlatList
          data={commonCountries}
          renderItem={({ item }) => (
            <CountryCard
              item={item}
              isSelected={selectedCommonCountry === item.id}
              onPress={() => {
                setSelectedCommonCountry(item.id);
                handleCountrySelect(item);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: SIZES.base * 2 }}
        />
      </View>
      <Text style={[styles.subtitle, { paddingHorizontal: SIZES.base * 2 }]}>
        All the countries
      </Text>
    </>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No countries found</Text>
      <Text style={styles.emptySubtext}>
        Try searching with different keywords
      </Text>
    </View>
  );

  return (
    <>
      <AppHeader title="Transfers" />
      <SafeAreaView
        style={styles.container}
        edges={["bottom", "left", "right"]}
      >
        <Text style={styles.title}>
          To which country do you want to send money?
        </Text>
        <SearchInput
          placeholder="Search by country"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredCountries}
          renderItem={({ item }) => (
            <CountryListItem
              item={item}
              onPress={() => handleCountrySelect(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={[
            styles.listContent,
            filteredCountries.length === 0 && styles.emptyListContent,
          ]}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.darkGrey,
    paddingHorizontal: SIZES.base * 2,
    marginBottom: SIZES.base * 2,
    paddingTop: SIZES.base * 2,
  },
  subtitle: {
    ...FONTS.h4,
    color: COLORS.darkGrey,
    marginBottom: SIZES.base * 1.5,
    paddingHorizontal: SIZES.base * 2,
  },
  commonCountriesSection: {
    paddingVertical: SIZES.base * 2,
  },
  listContent: {
    paddingBottom: SIZES.base * 2,
  },
  emptyListContent: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: SIZES.base * 4,
  },
  emptyText: {
    ...FONTS.h4,
    color: COLORS.darkGrey,
    marginBottom: SIZES.base,
  },
  emptySubtext: {
    ...FONTS.body,
    color: COLORS.grey,
  },
});
